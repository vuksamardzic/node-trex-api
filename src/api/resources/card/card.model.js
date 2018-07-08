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
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'list'
  }
};

const cardSchema = mongoose.Schema(schema);

export const Card = mongoose.model('card', cardSchema);
