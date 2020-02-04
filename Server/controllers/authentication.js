const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../schema/user.js');
const config = require('../config/main');
const moment = require('moment');

function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

function setUserInfo(request) {
  return {
    userName: request.userName,
    password: request.password,
  };
}

  //========================================
// Login Route
//========================================
exports.signin = function(req, res, next) {
  let userInfo = setUserInfo(req.body);
  console.log(userInfo);
  // console.log(req.body);
  res.status(200).json({
    status: 200,
    message: "You're authorized to see this secret message.",
    token: 'JWT ' + generateToken(userInfo),
    userName: userInfo.userName,
  });
}


//========================================
// Registration Route
//========================================
exports.signup = function(req, res, next) {
  // Check for registration errors
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // console.log(req);

  // Return error if no email provided
  if (!userName) {
    return res.status(422).json({ status: 422, error: 'You must enter an user name.'});
  }
  // Return error if no password provided
  if (!password) {
    return res.status(422).json({ status: 422, error: 'You must enter a password.' });
  }

  if (!firstName) {
    return res.status(422).json({ status: 422, error: 'You must enter a first name.' });
  }

  if (!lastName) {
    return res.status(422).json({ status: 422, error: 'You must enter a last name.' });
  }
  // // Return error if full name not provided
  // if (!firstName || !lastName) {
  //   return res.status(422).send({ error: 'You must enter your full name.'});
  // }

  // console.log(userName);
  let user = new User({
    userName: userName,
    password: password,
    email: email,
    lastName: lastName,
    firstName: firstName,
    createTime: moment().format('YYYY MM Do, h:mm a'),
  });


  User.findOne({$or: [{'email': email}, {'userName': userName}]}, function(err, existingUser) {
      if (err) { return next(err); }
      // console.log(existingUser.userName);
      // If user is not unique, return error
      if (existingUser) {
        console.log(existingUser);
        if(existingUser.userName == user.userName){
          return res.status(422).json({ status: 422, error: 'This user name is already in use.' });
        }
        else{
          return res.status(422).json({ status: 422, error: 'This email is already registered.' });
        }
      }

      // If email is unique and password was provided, create account
      // let user = new User({
      //   userName: userName,
      //   password: password,
      // });
      // console.log(user);
      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);
        // res.json({ success: true, message: 'Successfully created new user.' })
        res.status(201).json({
          status: 201,
          error: '',
          message: 'Your account is successfully created.',
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}
