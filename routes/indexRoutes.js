var express = require('express');
var router = express.Router();

router.get('/', { maxAge: 1000 * 60 * 60 * 24 }, function (req, res, next) {
    res.render('indexZX');
});
/*
router.get('/:icao', function (req, res, next) {
    var icao = req.params.id.toUpperCase();
    res.redirect('airports/' + icao);
});
*/
module.exports = router;