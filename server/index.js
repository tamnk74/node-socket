import express from 'express';
import path from 'path';
import cors from 'cors';
import uuid from 'uuid';
import compression from 'compression';
import bodyParser from 'body-parser';
import { WebRouter, ApiRouter } from './routes';
import { MONGODB_URI } from './config';
import Message from './models/Message';

const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// Allow cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', WebRouter);
app.use('/api', ApiRouter);

// Configuring the database
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database ', MONGODB_URI);
}).catch((err) => {
  console.error('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// listen on every connection
io.on('connection', (socket) => {
  console.log('New user connected');
  io.sockets.to(socket.id).emit('set_id', { socketId: socket.id });
  // default username
  socket.username = 'Anonymous';

  // Listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username;
    console.log('Username:', socket.id, socket.rooms, socket.username);
  });

  // listen on new_message
  socket.on('new_message', (data) => {
    // broadcast the new message
    console.log('add message:', data);
    const message = new Message({
      id: uuid.v4(),
      userId: data.userId || socket.userId,
      message: data.message,
    });
    message.save();
    io.sockets.emit('new_message', { message: data.message, username: socket.username, id: socket.id });
  });

  // listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { username: socket.username });
  });
});

http.listen(PORT, () => console.log(`Listening on ${PORT}`));
