const express = require('express');
const router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.post('/create-loja', async (req, res) => {
    const user = new User({...req.body, tipoUser: "Loja"});

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({
            success: "Usuário Loja criado com sucesso!",
            token: token
        });
    } catch(e){
        console.log(e);
        console.log(e.message);
        res.status(400).json({error: 'Não foi possível criar o usuário Loja!'});
        return;
    }
});

router.post('/create-cliente', async (req, res) => {
    const user = new User({...req.body, tipoUser: "Cliente"});

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({
            success: "Usuário Cliente criado com sucesso!",
            token: token
        });
    } catch(e){
        console.log(e);
        console.log(e.message);
        res.status(400).json({error: 'Não foi possível criar o usuário Cliente!'});
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            success: "Usuário logado!",
            token: token
        });
    } catch (e) {
        res.status(400).json({
            error: "Não foi possível logar!"
        });
        return;
    }
})

module.exports = router;