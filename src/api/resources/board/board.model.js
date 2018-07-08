import mongoose from 'mongoose';

const schema = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'list'
  }]
};

const boardSchema = mongoose.Schema(schema);

export const Board = mongoose.model('board', boardSchema);
