const mongoose = require('mongoose');

const vendaAndQtd = new mongoose.Schema({
    item: {

    },
    quantidade: {
        type: Number,
        required: true
    },
    loja: {

    },
    cliente: {
        
    }
});