import uuid from 'uuid';
import Message from '../../models/Message';
/**
 * Create new Message
 */
exports.create = async (req, res) => {
  try {
    const message = new Message({
      id: uuid.v4(),
      userId: req.body.userId,
      message: req.body.message,
    });
    const result = await message.save();
    return res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all messages
 */
exports.findAll = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};

/**
 * Get Message by id
 */
exports.findOne = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    return res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};

/**
 * Update message
 */
exports.update = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id,
      { message: req.body.message }, { new: true });
    return res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};

/**
 * Remove a message
 */
exports.delete = async (req, res) => {
  try {
    const message = await Message.findByIdAndRemove(req.params.id);
    return res.status(200).send(message);
  } catch (err) {
    next(err);
  }
};
