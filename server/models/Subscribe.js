import mongoose from 'mongoose';

const SubscribeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Subscribe', SubscribeSchema);