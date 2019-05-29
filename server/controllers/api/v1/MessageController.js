import Message from '../../../models/Message.js';
import Response from '../../../lib/utils/Response';
import uuid from 'uuid';
/**
 * Create new Message
 */
exports.create = async (req, res) => {
  try {
    const message = new Message({
      id: uuid.v4(),
      userId: req.body.userId,
      message: req.body.message
    });
    const result = await message.save();
    return Response.success(res, result)
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Get all messages
 */
exports.findAll = async (req, res) => {
  try {
    const messages = await Message.find();
    return Response.success(res, messages);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Get Message by id
 */
exports.findOne = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    return Response.success(res, message);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Update message
 */
exports.update = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id,{ message: req.body.message }, { new: true });
    return Response.success(res, message);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Remove a message
 */
exports.delete = async (req, res) => {
  try {
    const message = await Message.findByIdAndRemove(req.params.id);
    return Response.success(res, message);
  }
  catch (err) {
    return Response.error(res, err)
  }
};