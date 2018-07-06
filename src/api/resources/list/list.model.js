import mongoose from 'mongoose';

const schema = {
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board'
  }
};

const listSchema = mongoose.Schema(schema);

export const List = mongoose.model('list', listSchema);
