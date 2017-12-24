module.exports = function (app, config, db) {
    var MetarFetcher = require('metar-taf').MetarFetcher;
    var TafFetcher = require('metar-taf').TafFetcher;
    var notamFetcher = require('notams');
    var metarFetcher = new MetarFetcher();
    var tafFetcher = new TafFetcher();
    var config = require('./config.js');
    // web address merger
    if (config.website.https == true) {
        var rootaddressMerge = "https://" + config.website.rootAddress
    } else {
        var rootaddressMerge = "http://" + config.website.rootAddress
    }

    // atc page compiler
    app.get('/:icao', function (req, res) {
        var icao = req.params.icao.toUpperCase();
        console.log(icao)
        var dbPrCall = new Promise(
            function (resolve, reject) {
                db.findOne({
                    "airport.icao": icao
                }, function (err, docs) {
                    //console.log(docs)
                    if (docs != null && Object.keys(docs.airport).length > 0) {
                        resolve(docs.airport);
                    } else {
                        console.log("database find error")
                        //console.log(docs.airport)
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
        var notamPrCall = new Promise(
            function (resolve, reject) {
                // if (icao.charAt(0) == 'K' || icao.charAt(0) == 'P') {
                notamFetcher(icao).then(function (response) {
                    //console.log(response[0].notams)
                    resolve(response[0].notams);
                }, function (error) {
                    console.error(error);
                    reject(error);
                })
            }
        );
        Promise.all([metarPrCall, tafPrCall, notamPrCall, dbPrCall])
            .then(values => {
                var atc
                console.log()
                var pathAt = '/' + icao + "/atc"
                if (req.route.path == pathAt) {
                    atc = true
                } else {
                    atc = false
                    console.log(atc)
                }
                var merged = {
                    "weather": {
                        "metar": values[0],
                        "taf": values[1],
                        "notams": values[2]
                    },
                    "airport": values[3],
                    "atc": atc,
                    "beginner": true,
                    "rootAddress": rootaddressMerge
                }
                res.render('airport', merged)
                console.log(merged)
            })
            .catch(err => {
                console.log("error: " + err)
            })
    })

    app.get('/:icao/entry', function (req, res) {
        var icao = req.params.icao.toUpperCase();
        var DbCall = new Promise(
            function (resolve, reject) {
                db.findOne({
                    "airport.icao": icao
                }, function (err, docs) {
                    //console.log(docs)
                    if (docs != null && Object.keys(docs.airport).length > 0) {
                        resolve(docs.airport);
                    } else {
                        //console.log("database find error")
                        //console.log(docs.airport)
                        reject(err)
                    }
                    //console.log(merged);

                }
                )
            }
        )
        DbCall.then(values => {
            //console.log('already exists');
            res.render('form', {
                "icao": icao,
                "readonly": true,
            });
        });
        DbCall.catch(err => {
            if (err == null) {
                res.render('form', {
                    "icao": icao
                });
            }
        }
        )
    });



    app.post('/:icao/entry', (req, res) => {
        var icao = req.params.icao.toUpperCase();
        console.log(req.fields)
    });
};
