const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    if (!errors.isEmpty()) {
       const error = new Error('Validation failed.');
       error.statusCode = 422;
       throw error;
      // const error = new Error('A user with this email could not be found.');
      // error.statusCode = 401;
    }
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name
    });   
    const result = await user.save();
    const token0 = jwt.sign(
      {
        name: name,
        userId: result._id.toString(),
        email: email
      },
      'somesupersecretsecret',

    );
    res.status(201).json({ message: 'User created!',
     userId: result._id.toString(),
      email: email, token: token0 ,name: name});
  } catch (err) {
    console.log("error")
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const authHeader = req.get('Authorization');
  console.log("token", authHeader)
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        name: loadedUser.name,
        userId: loadedUser._id.toString()
      },
      'somesupersecretsecret',
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString(), email: email,name: loadedUser.name });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
