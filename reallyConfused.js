app.param('icao', function (req, res, next) {
    var icaoTres = req.params.icao.toUpperCase();
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
            next();

        })
        .catch(err => {
            console.log("error: " + err)
        })
})
  });
});
app.get(['/:icao/pilot', '/:icao/atc', '/:icao'], function (req, res, next) {
    res.render('airport', merged)
    console.log(merged)


});

