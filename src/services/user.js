const user = require('../models/user')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const task = require("../models/task");
const dotenv = require('dotenv');


dotenv.config()



async function createUser (payload) {
  
  const foundEmailOrUser = await user.findOne({ where: {
      [Op.or]: [
        { email: payload.email },
        { userName: payload.userName } 
      ]
    }
  });

  if (foundEmailOrUser) {
    return {
      message: "Username or email duplicate",
      statusCode: 400,
      status: "failure"
    };
  }
  const saltRounds = Number(process.env.SALT_ROUNDS);

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(payload.password, salt);
  payload.password = hashedPassword;
  
  
      const newUser = await user.create(payload)
    return {
        message: "User created successfully",
        status: "success",
        statusCode: 201,
        data: newUser
}
};

const login = async (payload) => {
    const foundUser = await user.findOne({ email: payload.email });
  
    if (!foundUser) {
        return{
            message: "User not found or  incorrect",
            status: "failure",
            statusCode: 404,
          };
  };
  
    const foundPassword = await bcrypt.compare(
      payload.password,
      foundUser.password
    );
    if (!foundPassword) {
        return{
            message: "password incorrect",
            status: "failure",
            statusCode: 401,
          };
    };
  
    const token = jwt.sign(
      {
        id: foundUser.id
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    foundUser.token = token;
    return{
        message: `Welcome, ${foundUser.userName}!`,
        status: "success",
        statusCode: 200,
        data: foundUser,
        token: foundUser.token
  };
};

  
// TASK Section
   
async function createTask(payload) {
  const foundTitleOrDescription = await task.findOne({
    where: {
      [Op.or]: [
        { title: payload.title },
        { description: payload.description }
      ]
    }
  });

  if (foundTitleOrDescription) {
    return {
      message: "Title or description duplicate",
      statusCode: 400,
      status: "failure"
    };
  }

  const newTask = await task.create(payload);
  console.log(newTask);
  return {
    message: "Task created successfully",
    status: "success",
    statusCode: 201,
    data: newTask
  };
}


  async function readTask(payload) {
    const foundTitle = await task.findAll()
    // const foundTitle = await task.findByPk(2);
      if (!foundTitle) {
          return {
              message: "task not found",
              statusCode: 400,
              status: "failure"
      }
      };
  return {
      message: "Task found successfully",
      status: "success",
      statusCode: 201,
      data: foundTitle
      }
};
    
  const updateTask = async (payload) => {
      
    const foundTask = await task.findOne({ id: payload.id });
      if (!foundTask) {
          return {
              message: "Task not found",
              status: "faiure",
              statusCode: 400,
          }
      }
      const updatedTask = await task.update(
          { id: foundTask.id },
          payload,
          { new: true }
      );
     
      return {
          message: "Task updated successfully",
          status: "success",
          statusCode: 201,
          data: updatedTask
      }
  };
  
  const deleteTask = async (payload) => {
      
      const foundTask = await task.findOne({ id: payload.id });
      if (!foundTask) {
          return {
              message: "Task not found",
              status: "faiure",
              statusCode: 400,
          }
      }
      const deletedTask = await task.destroy(
          { id: foundTask.id },
          payload,
          { new: true }
      );
      
      return {
          message: "Task deleted successfully",
          status: "success",
          statusCode: 201,
          data: deletedTask
      }
  };
  
module.exports = {
    createUser,
    login,
    createTask,
      readTask,
      updateTask,
  deleteTask,
}
  
// googleAuth: passport.authenticate('google', { scope: ['profile'] }),
//   googleAuthCallback: passport.authenticate('google', { failureRedirect: '/oauth' })