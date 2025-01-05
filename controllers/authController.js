
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const inscription = async (req, res) => {

    const { nom, prenom, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ nom, prenom, email, password: hashedPassword });
        res.status(201).json({ message:"Utilisateur enregistre avec succes",user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const connexion = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    try {
        
        const user = await User.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: "Utilisateur non trouve" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: "Connexion reussie", token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

      
}

module.exports = { inscription, connexion };