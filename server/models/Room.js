import mongoose from 'mongoose';

import toJSON from './plugins/toJSON';
import findOrCreate from './plugins/findOrCreate';

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: [0, 1],
    required: true,
    default: 0,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
}, {
  timestamps: true,
});

RoomSchema.plugin(toJSON);
RoomSchema.plugin(findOrCreate);

module.exports = mongoose.model('Room', RoomSchema);