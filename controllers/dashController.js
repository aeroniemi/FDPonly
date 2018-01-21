var Airport = require('../models/airportAct');
var Runway = require('../models/runwayAct');
var Trainer = require('../models/atcoTrainerAct');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');
var MarkdownIt = require('markdown-it'),
    markdown = new MarkdownIt();
var MetarFetcher = require('metar-taf').MetarFetcher;
var TafFetcher = require('metar-taf').TafFetcher;
var notamFetcher = require('notams');
var metarFetcher = new MetarFetcher();
var tafFetcher = new TafFetcher();
var terminalProcedures = require('terminal-procedures')
//Local Modules
var config = require('../config.js');
var localConfig = require('../localConfig.js');
const util = require('util');

exports.index = function (req, res) {
    res.render('dashIndex', {
        layout: 'dash', config: config,
        user: {
            localDivision: [
                {
                    firCode: 'LBSR',
                    firName: 'Sofia',
                    firUrl: 'lbsr'
                },
            ],
            visitingDivision: [
                {
                    firCode: 'LRBB',
                    firName: 'Bucharest',
                    firUrl: 'lrbb'
                },
            ],
        }
    });
};
exports.firIndex = function (req, res) {
    var firMZS = req.params.firMZS.toLowerCase()
    var firMZSUp = req.params.firMZS.toUpperCase()
    Airport.find({ 'fir': firMZS }, 'icao city name')
        .exec(function (err, firAirports) {
            if (err) { return next(err); }
            console.log(firAirports)
            console.log(firMZS)
            res.render('dashFirIndex', {
                layout: 'dash', config: config, firAirports: firAirports, pageData: {
                    firCode: firMZSUp,
                },
                user: {
                    localDivision: [
                        {
                            firCode: 'LBSR',
                            firName: 'Sofia',
                            firUrl: 'lbsr'
                        },
                    ],
                    visitingDivision: [
                        {
                            firCode: 'LRBB',
                            firName: 'Bucharest',
                            firUrl: 'lrbb'
                        },
                    ],
                },

            });
        });
};