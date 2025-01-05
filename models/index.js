const sequelize = require('../config/database');
const { User } = require('./user');

sequelize.sync({ force: false })
    .then(() => {
        console.log(`base de données et tables synchronise!`);
    })
    .catch((err) => {
        console.log("Erreur de synchronisation de la base de donne",err);
    });

module.exports = {  User };