const express = require('express');
const router = express.Router()
const user = require('../controllers/user')
const userValidator = require('../middlewares/validation');
const authmiddleware = require("../middlewares/auth")

router.post('/createUser', userValidator, user.createuser);
router.post("/login", user.login);
router.get('/logout', user.logout);
router.post('/createTask', authmiddleware.authenticate, user.createTask);
// app.get('/readTask/:taskId', (req, res) => {
//     const taskId = req.params.taskId;
    
//   });
router.get('/readTask/:taskId',authmiddleware.authenticate,  user.readTask);
router.put('/updateTask',authmiddleware.authenticate,  user.updateTask);
router.delete('/deleteTask',authmiddleware.authenticate, user.deleteTask);

module.exports = router; 
