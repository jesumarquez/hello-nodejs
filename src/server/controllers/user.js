var user    = require('../models/user'),
    jwt     = require('jwt-simple'),
    db      = require('../config/database');

exports.postUsers = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });
        
        user.save(function (err) {
            if(err){
                res.json({success: false, message: 'Username already exists.'});
            }
            
            res.json({success: true, message: 'Successful created new user.'});
        });
    }
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.postAuthenticate = function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, db.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}