module.exports = function (app, config, db) {
    var MetarFetcher = require('metar-taf').MetarFetcher;
    var TafFetcher = require('metar-taf').TafFetcher;
    var metarFetcher = new MetarFetcher();
    var tafFetcher = new TafFetcher();


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

    // web address merger
    if (config.website.https == true) {
        var rootaddressMerge = "https://" + config.website.rootAddress
    } else {
        var rootaddressMerge = "http://" + config.website.rootAddress
    }

    // atc page compiler
    app.get('/:icao/atc', function (req, res) {
        var icao = req.params.icao.toUpperCase();
        var dbPrCall = new Promise(
            function (resolve, reject) {
                db.findOne({
                    "airport.icao": icao
                }, function (err, docs) {
                    //console.log(docs)
                    if (docs != "[]") {
                        resolve(docs);
                    } else {
                        reject(err)
                    }
                    //console.log(merged);

                }
                )
            }
        );
        var metarPrCall = new Promise(
            function (resolve, reject) {
                metarFetcher.getData(icao).then(function (response) {
                    //console.log(response)
                    resolve(response);
                }, function (error) {
                    console.error(error);
                    reject(error);
                });
            }
        );
        var tafPrCall = new Promise(
            function (resolve, reject) {
                tafFetcher.getData(icao).then(function (response) {
                    //console.log(response)
                    resolve(response);
                }, function (error) {
                    console.error(error);
                    reject(error);
                })
            }
        );
        Promise.all(metarPrCall, tafPrCall, dbPrCall).then(values => {
            var merged = {
                "weather": {
                    "metar": values[1],
                    "taf": values[2]
                },
                "airport": values.airport,
                "atc": true,
                "rootAddress": rootaddressMerge
            }
            res.render('airport', merged)
            console.log(merged)
        });
    })
    // pilot page compiler
    app.get('/:icao/pilot', function (req, res) {
        var icao = req.params.icao.toUpperCase();

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
            res.render('airport', merged)
        });
    });
    // pilot page compiler
    app.get('/:icao', function (req, res) {
        var icao = req.params.icao.toUpperCase();
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
            res.render('airport', merged)
        });
    });

    app.get('/', function (req, res) {
        res.render('home');
    });
};
