const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Feed', new Schema({
  id: String,
  name: String,
  message: String,
  created_time: String
}))
