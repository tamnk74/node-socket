import Room from '../../models/Room';
import User from '../../models/User';


module.exports = async () => {
  const users = await User.find();
  const rooms = [
    {
      filter: { name: 'General' },
      data: {
        name: 'General',
        type: 1,
        key: 'general#room#1',
        members: users.map(user => user.id),
      },
    },
  ];
  const results = await Promise.all(rooms.map((room) => Room.findOrCreate(room.filter, room.data)));
  console.log(results);
  return results.map((item) => item[1]);
};