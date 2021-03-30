import User from '../../../models/User';
import uuid from 'uuid';

/**
 * Create new user
 */
exports.create = async (req, res) => {
  try {
    const user = new User({
      id: uuid.v4(),
      name: req.body.name,
      password: req.body.password
    });
    const result = await user.save();

    return Response.success(res, result)
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Get all users
 */
exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    return Response.success(res, users);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Get user by id
 */
exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    return Response.success(res, user);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Update user
 */
exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, Object.assign(
      { id: uuid.v4() },
      req.body.name ? { name: req.body.name } : {},
      req.body.password ? { password: req.body.password } : {}
    ), { new: true });
    return Response.success(res, user);
  }
  catch (err) {
    return Response.error(res, err)
  }
};

/**
 * Remove user
 */
exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    return Response.success(res, user);
  }
  catch (err) {
    return Response.error(res, err)
  }
};