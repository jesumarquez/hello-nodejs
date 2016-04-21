var express         = require('express'),
    app             = express(),
    router          = express.Router(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    db              = require('./src/server/config/database'),
    Schema          = mongoose.Schema,
    passport        = require('passport'),
    userRoute       = require('./src/server/controllers/user');

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

router.get('/products', function (req, res) {
    res.json([{
        name: 'product 1'
    }]);
});

router.post('/signup', userRoute.postUsers);

app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port, function(){
   console.log('Server is running on port: ' + port); 
});