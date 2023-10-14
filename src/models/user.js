
const { sq } = require('../configs/database');
const { DataTypes } = require('sequelize');

const User = sq.define("user", {
    userName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },

});

User.sync()
    .then(() => {
        console.log('user sync successful');
    })
.catch ((err) => {
    console.log(err);
});

module.exports = User;