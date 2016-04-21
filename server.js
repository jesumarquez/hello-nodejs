var express         = require('express'),
    app             = express(),
    router          = express.Router(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    db              = require('./src/server/config/database'),
    Schema          = mongoose.Schema,
    passport        = require('passport'),
    userRoute       = require('./src/server/controllers/user')
    jwt             = require('jwt-simple');

mongoose.connect(db.database, function(err){
    if(err){
        return console.log(err);
    }
});

// pass passport for configuration
require('./src/server/config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());

// router.get('/products', function (req, res) {
//     res.json([{
//         name: 'product 1'
//     }]);
// });




router.get('/products', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, db.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json([{
            name: 'product 1'
        }]);
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

    
router.post('/signup', userRoute.postUsers);
router.post('/authenticate', userRoute.postAuthenticate);

app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port, function(){
   console.log('Server is running on port: ' + port); 
});