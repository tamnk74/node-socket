import Room from '../../models/Room';

const rooms = [
  {
    filter: { name: 'General' },
    data: {
      name: 'General',
      type: 1,
      key: 'general#room#1'
    },
  },
];

module.exports = async () => {
  const results = await Promise.all(rooms.map((room) => Room.findOrCreate(room.filter, room.data)));
  console.log(results);
  return results.map((item) => item[1]);
};