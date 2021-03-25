import User from '../models/User';
import Message from '../models/Message';
import Room from '../models/Room';
import Jwt from './JWT';
import { events } from '../constants'

class Socket {
  constructor(socketIO) {
    this.socketIO = socketIO
  }

  listenConnection() {
    this.socketIO.use(async (socket, next) => {
      try {
        let token = socket.handshake.query.token;
        const payload = await Jwt.verifyToken(token)
        socket.user = payload.user;

        return next();
      } catch (e) {
        return next(e);
      }
    });
    this.socketIO.on('connection', (socket) => {
      console.log('New user connected', socket.id, socket.user.name);
      this.socketIO.sockets.to(socket.id).emit(events.SET_ID, { socketId: socket.id });
      this.socketIO.sockets.to(socket.id).emit(events.SET_USER, { user: socket.user });
      User.find().skip(0).limit(20).then(users => {
        this.socketIO.sockets.to(socket.id).emit(events.SET_USERS, users.map(user => user.toJSON()));
      });
      Room.find({
        members: socket.user.id,
        type: 1,
      }).skip(0)
        .limit(20).then(rooms => {
          this.socketIO.sockets.to(socket.id).emit(events.SET_ROOMS, rooms.map(room => room.toJSON()));
        });

      socket.on(events.JOIN_ROOM, async ({ roomId, members }) => {
        if (roomId) {
          const room = await Room.findById(roomId);
          if (!room) throw new Error('Invalid room');

          socket.room = room;
          Message.find({
            room: room.id
          }).populate('user').skip(0)
            .limit(20).then(messages => {
              this.socketIO.sockets.to(socket.id).emit(events.SET_MESSAGES, messages.map(message => message.toJSON()));
            });
          socket.join(room.id);
          this.socketIO.sockets.to(socket.id).emit(events.SET_ROOM, room);
          return
        }
        if (Array.isArray(members) && members.length == 2) {
          const users = await User.find({
            '_id': { $in: members }
          });
          console.log(members, users);
          if (users.length !== [...new Set(members)].length) {
            throw new Error('members.invalid');
          }
          const [, room] = await Room.findOrCreate({
            members: users.map(user => user.id),
            type: 0,
          }, {
            type: 0,
            key: members.sort().join('#'),
            name: members.sort().join('-'),
            members: users.map(user => user.id)
          });
          socket.room = room;
          Message.find({
            room: room.id
          }).populate('user').skip(0)
            .limit(20).then(messages => {
              this.socketIO.sockets.to(socket.id).emit(events.SET_MESSAGES, messages.map(message => message.toJSON()));
            });
          socket.join(room.id);


          this.socketIO.sockets.to(socket.id).emit(events.SET_ROOM, room);
          return;
        }
        // socket.broadcast.to(room.id).emit('message', { user: user, text: `${socket.user.name} has joined!` });
      });

      // listen on new_message
      socket.on('new_message', async (data) => {
        // broadcast the new message
        console.log(socket.user.name + ' add a new message in ', socket.room, data);
        const message = new Message({
          room: socket.room && socket.room.id,
          user: socket.user.id,
          message: data.message,
        });
        await message.save();
        this.socketIO.sockets.emit('new_message', {
          ...message.toJSON(),
          user: socket.user
        });
      });

      // listen on error
      socket.on('error', (error) => {
        console.error('Error: ', error)
      });

      // listen on typing
      socket.on('typing', () => {
        socket.broadcast.emit('typing', {});
      });

      socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
        // socket.leave(roomId);
      });
    });
  }
}

export default Socket;