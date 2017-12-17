module.exports = function (app, config, db) {
	var datas = {
		"airports": {
			"EGKK": {
				"type": "commerical",
				"ele": "154",
				"variation": "3.05",
				"icao": "EGKK",
				"iata": "LGW",
				"city": "London",
				"name": "Gatwick Airport",
				"lat": "0",
				"lon": "0",
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
					"2": {
						"end": [{
								"name": "08L",
								"heading": "085",
								"length": "2440m",
								"type": "ice"
				},
							{
								"name": "26R",
								"heading": "265",
								"length": "2440m",
								"type": "ice"
				}]
					},
				}
			}
		}


	};
	if (config.website.https == true) {
		var rootaddressMerge = "https://" + config.website.rootAddress
	} else {
		var rootaddressMerge = "http://" + config.website.rootAddress
	}

	app.get('/:icao/atc', function (req, res) {
		var icao = req.params.icao.toUpperCase();
		//console.log(icao)

		var merged = {
			"airport": datas.airports[icao],
			"atc": true,
			"rootAddress": rootaddressMerge
		}
		console.log(merged)
		res.render('airport', merged)
	});
	app.get('/:icao/pilot', function (req, res) {
		var icao = req.params.icao.toUpperCase();
		//console.log(icao)
		var merged = {
			"airport": datas.airports[icao],
			"atc": false,
			"rootAddress": rootaddressMerge
		}
		console.log(merged)
		res.render('airport', merged)
	});

	app.get('/:icao', function (req, res) {
		var icao = req.params.icao.toUpperCase();
		//console.log(icao)
		/*
        var merged = {
            "airport": datas.airports[icao],
            "atc": false,
            "rootAddress": rootaddressMerge
        }
        console.log(merged)
        res.render('airport', merged)
*/
		db.findOne({
			"airport.icao": icao
		}, function (err, docs) {
			//console.log(docs)
			if (docs != "[]") {
				var merged = {
					"airport": docs.airport,
					"atc": false,
					"rootAddress": rootaddressMerge
				}
			} else {
				var merged = {
					"error": err,
					"atc": false,
					"rootAddress": rootaddressMerge
				}

			}
			//console.log(merged);
			res.render('airport', merged)
		});

	});

	app.get('/', function (req, res) {
		res.render('home');
	});

};
