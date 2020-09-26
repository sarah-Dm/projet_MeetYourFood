const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dest_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    text: String,
    rate: { type: Number, min: 0, max: 5, required: true },
    averageCart: Number,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
