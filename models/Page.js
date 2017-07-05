const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Page', new Schema({
  id: String,
  name: String,
  category: String,
  about: String,
  description: String,
  phone: String,
  single_line_address: String,
  created_time: String,
  fan_count: Number,
  rating_count: Number,
  talking_about_count: Number,
  were_here_count: Number,
  star: Boolean
}))
