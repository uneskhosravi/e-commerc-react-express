const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT } = require('../constants');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        default: ROLE_MEMBER,
        enum: [ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT]
      },
    orderHistory: {
      type: ObjectId,
      ref:'Order' ,
    },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
  },
  { timestamps: true }
);



module.exports = mongoose.model('User', userSchema);
