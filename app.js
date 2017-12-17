var express = require('express');
var exphbs = require('express-handlebars');
var config = require('./config.js');
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'airports.database',
    autoload: true
});
var app = express();
/*var runways = {
			"runways": {
				"hexcode2": {
					"name": "hello",
					"heading": "085",
					"length": "2440m",
					"type": "ice"
				}
			}
		}; */
app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');
app.use(express.static('./static')); // use static folder
/*
app.get('/', function (req, res) {
		res.render('home', runways);
	});
	*/
require("./routes.js")(app, config, db);

app.listen(config.website.port);
