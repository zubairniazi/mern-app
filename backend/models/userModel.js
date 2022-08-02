const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (email, password) {
  if (!email || !password) throw Error('All fields are required');

  if (!validator.isEmail(email)) throw Error('Email is not valid');

  if (!validator.isStrongPassword(password)) throw Error('Password is weak');

  const exists = await this.findOne({ email });

  if (exists) throw Error('Email already in use.');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return await this.create({ email, password: hash });
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error('All fields are required');

  const user = await this.findOne({ email });
  if (!user) throw Error('Login credentials are not valid.');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error('Login credentials are not valid.');

  return user;
};

module.exports = mongoose.model('User', userSchema);
