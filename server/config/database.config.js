import dotenv from 'dotenv';

dotenv.config();

// Mongodb config
export const dbConfig = {
  URL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chat-socket',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};
