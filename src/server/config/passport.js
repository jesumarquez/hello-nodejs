var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
    User        = require('../models/user'),
    db          = require('./database');
    
module.exports = function (passport) {
    var opts = {};
    opts.secretOrKey = db.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user){
           if (err) {
               return done(err, false);
           } 
           if (user) {
               done(null, user);
           } else {
               done(null, false);
           }
        });
    }));
}