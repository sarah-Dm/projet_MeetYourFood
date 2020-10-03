const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //profileType: String, //ajouté
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
    required: true
  },
  profilePic: {
    type: String,
    default: 'https://res.cloudinary.com/nina3am/image/upload/v1601573838/meet-your-food/PngItem_307416%20%281%29.png.png'
  },
  host: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;