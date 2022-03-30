const mongoose = require('mongoose');

const vendaAndQtdSchema = new mongoose.Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: 'Anuncio',
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    loja: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cliente: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const VendaAndQtd  = mongoose.model('VendaAndQtd', vendaAndQtdSchema);

module.exports = VendaAndQtd;