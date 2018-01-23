var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AirportSchema = new Schema(
    {
        icao: { type: String, required: true, max: 4 },
        fir: { type: String, required: true, max: 6 },
        type: { type: 'decimal', required: true, max: 1 },
        ele: { type: 'decimal', required: true, max: 15000 },
        variation: { type: 'decimal' },
        iata: { type: String, max: 3 },
        faa: { type: String, max: 3 },
        city: { type: String, required: true, max: 100 },
        name: { type: String, required: true, max: 100 },
        lat: { type: 'decimal', required: true },
        lon: { type: 'decimal', required: true },
        runways: [{ type: Schema.ObjectId, ref: 'RunwayDB', required: true }],
    }
);


//Export model
module.exports = mongoose.model('AirportDB', AirportSchema);
