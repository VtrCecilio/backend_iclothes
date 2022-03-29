const express = require('express');
const router = express.Router();
const User = require('../models/user');

const Auth = require('./auth');

// /lojas

router.get('/', async (req, res) => {
    const lojas = await User.find({tipoUser: "Loja"}, {nome: 1, endereco: 1, _id: 1});

    res.status(200).json(lojas);
    return;
});

router.get('/:id', async (req, res) => {


});

router.post('/create-anuncio', async (req, res) => {


});

router.delete('/delete-anuncio', async (req, res) => {

});

router.get('/anuncios', async (req, res) => {
    
});

module.exports = router;