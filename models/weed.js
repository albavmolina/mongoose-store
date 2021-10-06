const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const weedSchema = new Schema({
    name: { type: String },
    description: { type: String },
    img: { type: String },
    price: { type: String },
    qty: { type: Number },
}, { timestamps: true });


const Weed = mongoose.model('Weed', weedSchema)

module.exports = Weed;


