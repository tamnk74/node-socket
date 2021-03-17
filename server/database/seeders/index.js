require('@babel/register');
require('@babel/polyfill');
const mongoose = require('mongoose');
const { dbConfig } = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.URL, dbConfig.options);
console.log('Connect to ', dbConfig.URL);

const userSeeder = require('./users');
const roomSeeder = require('./rooms');
const Message = require('../../models/Message');

async function dbseed() {
  try {
    // await seeder.import(collections);
    await userSeeder();
    // await Message.deleteMany({ roomId: null });
    await roomSeeder();
    console.log('Done seeder!!!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

dbseed();