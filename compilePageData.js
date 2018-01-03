module.exports = function (icao) {
    var MetarFetcher = require('metar-taf').MetarFetcher;
    var TafFetcher = require('metar-taf').TafFetcher;
    var metarFetcher = new MetarFetcher();
    var tafFetcher = new TafFetcher();

    var notamPrCall = new Promise(
        function (resolve, reject) {
            if (icao.charAt(0) == 'K' || icao.charAt(0) == 'P') {
                resolve(require('notams')(icao, {
                    format: 'DOMESTIC'
                }))
            } else {
                resolve(require('notams')(icao, {
                    format: 'ICAO'
                }))
            }
        }
    );

    /*
    var notamPrCall = new Promise(
        function (resolve, reject) {
            require('notams')(icao,   { 
                format:   'ICAO' 
            }).then(function(response) {
                console.log(response)
                resolve(response);
            }, function(error) {
                console.error(error);
                reject(error);
            });
        }
    );
    */

    var metarPrCall = new Promise(
        function (resolve, reject) {
            metarFetcher.getData(icao).then(function (response) {
                console.log(response)
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
                console.log(response)
                resolve(response);
            }, function (error) {
                console.error(error);
                reject(error);
            })
        }
    );
    Promise.all([notamPrCall, metarPrCall, tafPrCall]).then(values => {
        var mergedWeather = {
            "metar": values[1],
            "taf": values[2],
            "notams": values[0][0].notams
        }
        return mergedWeather
    })
}