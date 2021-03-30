import Room from '../../../models/Room';
import Fcm from '../../../services/Fcm';

/**
 * subscribe
 */
export const subscribe = async (req, res) => {
  try {
    const rooms = await Room.find({
      members: req.user.id,
    })
    await Fcm.registerToRoom(rooms, req.body.token);
    return res.status(200).json({});
  }
  catch (err) {
    console.error(err);
    return res.status(400).json(err)
  }
};


/**
 * unsubscribe
 */
 export const unsubscribe = async (req, res) => {
  try {
    const rooms = await Room.find({
      members: req.user.id,
    })
    await Fcm.unregisterFromRoom(rooms, req.body.token);
    return res.status(200).json({});
  }
  catch (err) {
    return res.status(400).json(err)
  }
};
