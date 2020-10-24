import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const schema = new mongoose.Schema({
  email: {
    desc: "The user's email address.",
    trim: true,
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    desc: "The user's firstname.",
    trim: true,
    type: String,
  },
  lastname: {
    desc: "The user's lastname.",
    trim: true,
    type: String,
  },
  username: {
    desc: "The user's pseudonime.",
    trim: true,
    type: String,
  },
  age: {
    desc: "The users's age.",
    type: Number,
  },
  gender: {
    desc: "user gender.",
    trim: true,
    type: String,
    enum: ["Male", "Female", "Others"],
    default: "Others",
    required: true,
  },
  isActive: {
    desc: "is Active.",
    type: Boolean,
    default: true,
    required: true,
  },
  userType: {
    desc: "user roles.",
    trim: true,
    type: String,
    enum: ["Admin", "User"],
    default: "Admin",
    required: true,
  },
}, {
  strict: true,
  versionKey: false,
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  },
});

schema.pre('save', async function (next) {
  // const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

schema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

module.exports = mongoose.model("Users", schema);