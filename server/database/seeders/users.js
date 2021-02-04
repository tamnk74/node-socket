const User = require('../../models/user');

const users = [
  {
    filter: { name: 'admin' },
    data: {
      name: 'admin',
      email: 'khac.tam.94@gmail.com',
      password: 'Admin123!@#',
      avatar: 'https://i1.wp.com/phocode.com/wp-content/uploads/2016/08/golang.sh-600x600.png',
      status: 1,
    },
  },
  {
    filter: { name: 'user' },
    data: {
      name: 'user',
      email: 'user@mailinator.com',
      avatar: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png',
      password: 'User123!@#',
      status: 1,
    },
  },
];

module.exports = async () => {
  const results = await Promise.all(users.map((user) => User.findOrCreate(user.filter, user.data)));
  return results.map((item) => item[1]);
};