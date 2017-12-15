module.exports = function (app) {
	var runways = {
		"runways": {
			"1": {
				"end": [{
					"name": "08R",
					"heading": "085",
					"length": "2440m",
					"type": "ice"
				},
				{
					"name": "26L",
					"heading": "265",
					"length": "2440m",
					"type": "ice"
				}]
			},
			"3": {
				"name": "08L",
				"heading": "085",
				"length": "200m",
				"type": "dirt"
			},
			"4": {
				"name": "26R",
				"heading": "265",
				"length": "200m",
				"type": "dirt"
			}
		}
	}; // order is implied in export, not needed in live



	app.get('/', function (req, res) {
		res.render('home', runways);
	});

};
