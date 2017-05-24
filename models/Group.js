var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GroupSchema   = new Schema({
  id: String,
  name: String,
  privacy: String,
  administrator: String,
  bookmark_order: String,
  unread: String
});

module.exports = mongoose.model('Group', GroupSchema);
