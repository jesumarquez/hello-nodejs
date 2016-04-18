var express     = require('express'),
    app         = express(),
    router      = express.Router(),
    bodyParser   = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

router.get('/products', function (req, res) {
    res.json([{
        name: 'product 1'
    }]);
});

app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port, function(){
   console.log('Server is running on port: ' + port); 
});