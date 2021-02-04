import uuid from 'uuid';
import Message from '../models/Message';

class Socket {
  constructor(socketIO) {
    this.socketIO = socketIO
  }

  listenConnection() {
    // this.socketIO.use(async (socket, next) => {
    //   try {
    //     const user = await fetchUser(socket);
    //     socket.user = user;
    //   } catch (e) {
    //     next(new Error("unknown user"));
    //   }
    // });
    this.socketIO.on('connection', (socket) => {
      console.log('New user connected', socket.rooms, socket.handshake);
      this.socketIO.sockets.to(socket.id).emit('set_id', { socketId: socket.id });
      // default username
      socket.username = 'Anonymous';

      // Listen on change_username
      socket.on('change_username', (data) => {
        socket.username = data.username;
        console.log('Username:', socket.id, socket.rooms, socket.username);
      });

      // listen on new_message
      socket.on('new_message', async (data) => {
        // broadcast the new message
        console.log('add message:', data);
        const message = new Message({
          id: uuid.v4(),
          userId: data.userId || socket.userId,
          message: data.message,
        });
        await message.save();
        this.socketIO.sockets.emit('new_message', { message: data.message, username: socket.username, id: socket.id });
      });

      // listen on typing
      socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username });
      });
    });
  }
}

export default Socket;