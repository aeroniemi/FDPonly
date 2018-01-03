var express = require('express');
var exphbs = require('express-handlebars');
var config = require('./config.js');
var localConfig = require('./localConfig.js');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs')
var morgan = require('morgan')
var notamLoader = require('./notams.js');
var index = require('./routes/indexRoutes');
var catalog = require('./routes/catalogRoutes');
var app = express();
var expressGoogleAnalytics = require('express-google-analytics');
module.exports = app;
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = localConfig.dbUrl;
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


var analytics = expressGoogleAnalytics(process.env.EVGaCode);

app.use(analytics);





app.engine('handlebars', exphbs({
	defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./static')); // use static folder
app.use('/', index);
app.use('/airports', catalog);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


app.listen(config.website.port);
