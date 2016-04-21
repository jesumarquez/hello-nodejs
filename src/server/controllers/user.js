var user = require('../models/user');

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