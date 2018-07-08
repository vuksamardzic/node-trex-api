import mongoose from 'mongoose';

const schema = {
  name: {
    type: String,
    required: true
  },
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board'
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card'
  }]
};

const listSchema = mongoose.Schema(schema);

export const List = mongoose.model('list', listSchema);
