var express = require('express');
var router = express.Router();
var config = require('../config.js');
var localConfig = require('../localConfig.js');
router.get('/', function (req, res, next) {
    res.render('indexZX', { config: config });
});
router.get('/dashboard', function (req, res, next) {
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
});
/*
router.get('/:icao', function (req, res, next) {
    var icao = req.params.id.toUpperCase();
    res.redirect('airports/' + icao);
});
*/
module.exports = router;    