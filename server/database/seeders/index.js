require('@babel/register');
require('@babel/polyfill');
const mongoose = require('mongoose');
const { dbConfig } = require('../../config');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.URL, dbConfig.options);

const userSeeder = require('./users');

async function dbseed() {
  try {
    // await seeder.import(collections);
    await userSeeder();
    console.log('Done seeder!!!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

dbseed();