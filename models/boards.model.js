const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: true
  }
};

const boardSchema = mongoose.Schema(schema);

const Board = module.exports = mongoose.model('board', boardSchema);

module.exports.getBoards = function (cb) {
  Board.find(cb);
};