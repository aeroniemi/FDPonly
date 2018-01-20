/* 
Main process script for FDPonly
2017; last clean 2018 01 12
*/
//Modules from NPM
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');
var fs = require('fs');
var minifyHTML = require('express-minify-html');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

//Local Modules
var config = require('./config.js');
var localConfig = require('./localConfig.js');

//Routing controllers
var index = require('./routes/indexRoutes');
var catalog = require('./routes/catalogRoutes');

//Express app setup
var app = express();
module.exports = app;

//Mongoose DB setup
var mongoDB = localConfig.dbUrl;
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Express minification setup
app.use(minifyHTML({
	override: true,
	exception_url: false,
	htmlMinifier: {
		removeComments: true,
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes: true,
		removeEmptyAttributes: true,
		minifyJS: true
	}
}));
//Morgan Logging setup
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//Express-HBS setup
app.engine('handlebars', exphbs({
	defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

//Express BodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express routing config
app.use(express.static('./static', { maxAge: 31557600000 }));
app.use('/', index);
app.use('/airports', catalog);

//Express 404 config
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//Express error config
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

//Express listener startup
app.listen(config.port);
