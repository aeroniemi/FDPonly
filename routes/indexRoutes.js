var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('indexZX', { config: config });
});
/*
router.get('/:icao', function (req, res, next) {
    var icao = req.params.id.toUpperCase();
    res.redirect('airports/' + icao);
});
*/
module.exports = router;