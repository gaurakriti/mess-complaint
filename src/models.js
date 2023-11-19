const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  day: String,
  meal: String,
  item: String
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
