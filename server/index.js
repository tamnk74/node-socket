require('@babel/register');
require('@babel/polyfill');
import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import { WebRouter, ApiRouter } from './routes';
import './database';
import Socket from './services/socket';
import { port } from './config'
import './services/passport';


const app = express();


const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = new Socket(io);
// Allow cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', WebRouter);
app.use('/api', ApiRouter);

socket.listenConnection();

http.listen(port, () => console.log(`Listening on ${port}`));
