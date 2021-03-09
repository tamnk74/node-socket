import mongoose from 'mongoose';

import toJSON from './plugins/toJSON';

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

MessageSchema.plugin(toJSON);
console.log('Add model message')

module.exports = mongoose.model('Message', MessageSchema);