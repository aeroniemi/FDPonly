/* 
Routing script for airport pages
2017; last clean 2018 01 12
*/
//Modules from NPM
var express = require('express');

//Local Modules
var airport_controller = require('../controllers/airportController');
var runway_controller = require('../controllers/runwayController');
var dash_controller = require('../controllers/dashController');
var config = require('../config.js');
var localConfig = require('../localConfig.js');
//Routing controllers
var router = express.Router();

/*
Document routes
*/
//GET home

router.get('/', dash_controller.index);

//GET list airport
router.get('/:firMZS/', dash_controller.firIndex);
//GET list runway
/*
router.get('/:firMZS/:icao/editData', dash_controller.AirportEdit);
router.get('/:firMZS/:icao/addData', dash_controller.AirportAdd);*/

//Express export routes
module.exports = router;
