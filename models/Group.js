const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Group', new Schema({
  id: String,
  name: String,
  privacy: String,
  administrator: String,
  bookmark_order: String,
  unread: String
}))
