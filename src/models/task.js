const user = require('../models/user')
const { sq } = require('../configs/database');
const { DataTypes } = require('sequelize');

const task = sq.define("task", {
    // userId: {
    //     type: DataTypes.STRING,
    //     ref: user.id
    // },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    dueDate: {
        type: DataTypes.DATE
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: 'incomplete'
    }
});

task.sync()
    .then(() => {
        console.log('task sync successful');
    })
.catch ((err) => {
    console.log(err);
});

module.exports = task;


