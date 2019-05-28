import express from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import { WebRouter } from './routes';
const PORT = process.env.PORT || 4000

const app = express();

// Allow cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', WebRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))