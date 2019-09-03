const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('users', userSchema);
