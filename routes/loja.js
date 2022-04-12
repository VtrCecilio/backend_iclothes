const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Anuncio = require('../models/anuncio');

const auth = require('../middlewares/auth');

// /lojas

router.get('/', async (req, res) => {
    const lojas = await User.find({tipoUser: "Loja"});

    res.status(200).json(lojas);
    return;
});

router.get('/anuncios', async (req, res) => {
    console.log('/lojas/anuncios');
    try {
        const anuncios = await Anuncio.find();
    
        res.status(200).json({
            success: "Anúncios encontrados com sucesso!",
            anuncios: anuncios
        });
        return;
    } catch (e) {
        res.status(400).json({
            error: "Não foi possível buscar anúncios!"
        });      
        return;
    }
});

router.get('/anuncios/:id', async (req, res) => {
    try {
        const anuncio = await Anuncio.find({_id: req.params.id});

        res.status(200).json({
            success: "Anúncio encontrado com sucesso!",
            anuncio: anuncio
        });
        return;
    } catch (e) {
        res.status(400).json({
            error: "Não foi possível encontrar anúncio!"
        });
        return;
    }
});

router.post('/anuncios/postar-comentario', auth, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({id: req.body.id});

        if (!anuncio){
            throw new Error();
        }

        anuncio.comentarios.push({autor: req.user, texto: req.body.texto});

        await anuncio.save();

        res.status(201).json({success: "Comentário criado com sucesso!"});
        return;
    } catch(e){
        console.log(e);
        res.status(500).json({error: "Não foi possível criar comentário!"});
    }
});

router.patch('/anuncios/editar-comentario', auth, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({id: req.body.id});

        if (!anuncio){
            throw new Error();
        }

        anuncio.comentarios.push({autor: req.user, texto: req.body.texto});

        await anuncio.save();

        res.status(201).json({success: "Comentário editado com sucesso!"});
        return;
    } catch(e){
        console.log(e);
        res.status(500).json({error: "Não foi possível editar comentário!"});
    }
});

router.get('/:id', async (req, res) => {
    const loja = await User.findById(req.params.id);

    res.status(200).json({
        nome: loja.nome,
        endereco: loja.endereco,
        anuncios: loja.anuncios
    });
    return;
});

router.post('/create-anuncio', auth, async (req, res) => {
    const anuncio = new Anuncio({...req.body, deleted: false});

    try {
        await anuncio.save();
        const user = await User.findOne({_id: req.body.loja});
        user.anuncios.push(anuncio)
        await user.save();

        res.status(201).json({
            success: "Anunciado criado com sucesso!",
            id: anuncio._id
        });
        return;
    } catch (e) {
        console.log(e.message);
        res.status(400).json({
            error: "Não foi possível criar anuncio!"
        });
        return;
    }
});

router.delete('/delete-anuncio', auth, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({_id: req.body.id});
        anuncio.deleted = true;
        await anuncio.save();
        
        res.status(201).json({
            success: "Anuncio deletado com successo!"
        });
        return;
    } catch (e) {
        res.status(400).json({
            error: "Não foi possível deletar anuncio"
        });
        return;
    }
});


module.exports = router;