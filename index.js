var config = require('./config.js');
var readline = require('readline');
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'airports.database',
    autoload: true
});
var datas = {
    EGKK: {
        type: "commerical",
        ele: "154",
        variation: "3.05",
        icao: "EGKK",
        iata: "LGW",
        city: "London",
        name: "Gatwick Airport",
        lat: "0",
        lon: "0",
        runways: {
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


};
db.insert(datas, function (err, newDoc) { // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
});
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var data = {}
rl.question("Airport ICAO: ", function (icao) {
    data[icao] = {}
    console.log(data)
    rl.question("type: ", function (answer1) {
        data[icao].type = answer1

        rl.question("elevation: ", function (answer2) {
            data[icao].elevation = answer2

            rl.question("variation: ", function (answer1) {
                data[icao].variation = answer1

                console.log(data)
                rl.close();
            });
        });
    });
});
