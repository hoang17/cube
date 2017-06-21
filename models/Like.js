const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Like', new Schema({
  id: String,
  name: String,
  category: String,
  created_time: String,
  star: Boolean
}))
