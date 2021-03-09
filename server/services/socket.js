import User from '../models/User';
import Message from '../models/Message';
import Jwt from './JWT';

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
      this.socketIO.sockets.to(socket.id).emit('set_id', { socketId: socket.id });
      this.socketIO.sockets.to(socket.id).emit('set_user', { user: socket.user });
      Message.find().populate('user').skip(0)
        .limit(20).then(messages => {
          this.socketIO.sockets.to(socket.id).emit('set_messages', messages.map(message => message.toJSON()));
        });
      User.find().skip(0)
        .limit(20).then(users => {
          this.socketIO.sockets.to(socket.id).emit('set_users', users.map(user => user.toJSON()));
        });

      // listen on new_message
      socket.on('new_message', async (data) => {
        // broadcast the new message
        console.log(socket.user.name + 'add a new message ', data);
        const message = new Message({
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