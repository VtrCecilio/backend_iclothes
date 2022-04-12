const express = require('express');
const router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/create-loja', async (req, res) => {
    const user = new User({...req.body, tipoUser: "Loja"});

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({
            success: "Usuário Loja criado com sucesso!",
            token: token,
            id: user._id
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
            token: token,
            id: user._id
        });
    } catch(e){
        console.log(e);
        console.log(e.message);
        res.status(400).json({error: 'Não foi possível criar o usuário Cliente!'});
        return;
    }
});

router.patch('/update-profile', auth, async(req, res) => {
    const updates = req.body;

    try {
        await User.updateOne({_id: req.user._id}, {
            $set:{
                ...updates
            }
        });

        res.status(201).json({success: "Update foi um sucesso!"});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({error: "Não foi possível atualizar os dados pessoais!"});
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            success: "Usuário logado!",
            token: token,
            id: user._id
        });
    } catch (e) {
        res.status(400).json({
            error: "Não foi possível logar!"
        });
        return;
    }
})

router.post('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.status(200).json({
            success: "Deslogado com sucesso!"
        });
    } catch (e) {
        res.status(500).json({
            error: "Não foi possível deslogar!"
        });
    }
});

module.exports = router;