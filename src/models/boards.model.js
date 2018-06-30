import mongoose from 'mongoose';

const schema = {
  name: {
    type: String,
    required: true
  }
};

const boardSchema = mongoose.Schema(schema);

export const Board = mongoose.model('board', boardSchema);
