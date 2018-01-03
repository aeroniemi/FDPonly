var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RunwaySchema = new Schema(
    {
        icao: { type: String, required: true, max: 4 },
        type: { type: String, required: true, max: 10 },
        heading1: { type: 'decimal' },
        heading2: { type: 'decimal' },
        name1: { type: String, required: true, max: 3 },
        name2: { type: String, required: true, max: 3 },
        lat: { type: 'decimal', required: true },
        lon: { type: 'decimal', required: true },
        length: { type: 'decimal', required: true },
        width: { type: 'decimal', required: true },
    }
);

//Export model
module.exports = mongoose.model('RunwayDB', RunwaySchema);
