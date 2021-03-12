import mongoose from 'mongoose';

import toJSON from './plugins/toJSON';

const MemberSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
}, {
  timestamps: true,
});

MemberSchema.plugin(toJSON);

module.exports = mongoose.model('Message', MemberSchema);