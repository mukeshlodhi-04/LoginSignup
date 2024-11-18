const mongoose = require("mongoose");
const url = process.env.DB_URL;


const db = mongoose.connect(url)
  .then(() => {console.log('Connected!')})
  .catch(()=> console.log('not connected'));

module.exports = db;
