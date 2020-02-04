const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  createTime: String,
});

UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema, 'userInfo');

// const Post = mongoose.model('Post', UserSchema);
//
// router.get('/posts', (req, res) => {
//   Post.find().select('userName password')
//     .then((doc) => {
//       console.log(doc);
//       res.send(doc);
//     });
// });
//
// router.post('/posts', (req, res) => {
//   const newPost = {
//     userName: req.body.userName,
//     password: req.body.password,
//   };
//
//   const data = new Post(newPost);
//   data.save((e) => {
//     if (e) throw e;
//     res.send({
//       msg: 'new register',
//     });
//   });
// });

// module.exports = router;
