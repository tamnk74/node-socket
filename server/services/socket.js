import uuid from 'uuid';
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
      console.log('New user connected', socket.id);
      this.socketIO.sockets.to(socket.id).emit('set_id', { socketId: socket.id });
      this.socketIO.sockets.to(socket.id).emit('set_user', { user: socket.user });

      // listen on new_message
      socket.on('new_message', async (data) => {
        // broadcast the new message
        console.log('add message:', data);
        const message = new Message({
          id: uuid.v4(),
          userId: socket.user.id,
          message: data.message,
        });
        await message.save();
        this.socketIO.sockets.emit('new_message', {
          message, user: socket.user, id: message.id, socketId: socket.id
        });
      });

      // listen on error
      socket.on('error', (error) => {
        console.error('Error: ', error)
      });

      // listen on typing
      socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
      });

      socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        // socket.leave(roomId);
      });
    });
  }
}

export default Socket;