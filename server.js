var express = require('express');
var cors = require('cors')
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');
var helper = require('./class/my')

var app = express();
var port = 3004;

//view engine
app.set('views', path.join(__dirname, 'ui'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder

app.use(express.static(path.join(__dirname, 'ui')));

//body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/', index);
app.use('/api', api);

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  });


app.listen(port, function() {
	console.log("connected with a port" + port);
  var helper1 = new helper('James', 'Bond');

   console.log(helper1.fullName());
});