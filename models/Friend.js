const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Friend', new Schema({
  id: String,
  name: String
}))
