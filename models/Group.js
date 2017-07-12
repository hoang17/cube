const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Group', new Schema({
  id: String,
  name: String,
  privacy: String,
  administrator: Boolean,
  bookmark_order: Number,
  unread: Number,
  star: Boolean,
}))
