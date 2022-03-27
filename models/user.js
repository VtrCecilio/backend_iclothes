const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const enderecoSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    nation: {
        type: String,
    }
});

const item = new mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    }
});

const itemAndQtd = new mongoose.Schema({
    item: item,
    quantidade: {
        type: Number
    }
});

const ticketCompra = new mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    itens: [itemAndQtd]
});

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tipoUser: {
        type: String,
        required: true
    },
    endereco: enderecoSchema,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.methods.generateAuthtoken = async function() {
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWTSECRET);
    
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}   

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});
    
    if (!user) {
        throw new Error('Não foi possível logar!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Não foi possível logar!');
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)    
    }

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;