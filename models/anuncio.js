const mongoose = require('mongoose');


const anuncioSchema = new mongoose.Schema({
    nomeItem: {
        type: String,
        required: true
    },
    valorItem: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
    },
    loja: {
        type: String, 
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    }
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;