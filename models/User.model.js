const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //profileType: String, //ajouté
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [/.*@.*\..*/, 'Please use a valid email address.'],
      required: true,
      unique: true,
    },
    //hashedPassword: { type: String, required: true },
    userName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    host: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
