module.exports = function (app, config) {
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

    app.get('/:icao/atc', function (req, res) {
        var icao = req.params.icao.toUpperCase();
        //console.log(icao)
        if (config.website.https == true) {
            var rootaddressMerge = "https://" + config.website.rootAddress
        } else {
            var rootaddressMerge = "http://" + config.website.rootAddress
        }
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
            "rootAddress": config.website.rootAddress
        }
        console.log(merged)
        res.render('airport', merged)
    });
    app.get('/:icao', function (req, res) {
        var icao = req.params.icao.toUpperCase();
        //console.log(icao)
        var merged = {
            "airport": datas.airports[icao],
            "atc": false,
            "rootAddress": config.website.rootAddress
        }
        console.log(merged)
        res.render('airport', merged)
    });

    app.get('/', function (req, res) {
        res.render('home');
    });

};
