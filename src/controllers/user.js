const User = require('../services/user')


const createuser = async (req, res) => {
    try {
      const data = await User.createUser(req.body);
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        message: error?.message || 'Unable to Create user',
        status: error?.status || 'failure',
      });
    }
};

const login = async (req, res) => {
    try {
      const data = await User.login(req.body);
  
    res.status(data.statusCode).json(data);
    } catch (error) {
       res.status(error?.statusCode).json({
        status: "failure",
        message: error?.message,
      });
    }
};

// const logout = async (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       console.error(err);
//       return res.redirect('/');
//     }
//     res.send("goodbye");
//   });
// };


const logout = async (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error(err);
      return res.redirect('/error-page'); 
    }
    req.session.destroy(function(err) {
      if (err) {
        console.error(err);
        return res.redirect('/error-page');
      }
      res.send("goodbye");
    });
  });
};



const createTask = async (req, res) => {
    try {
      const data = await User.createTask(req.body);
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        message: error?.message || 'Unable to Create task',
        status: error?.status || 'failure',
      });
    }
};

const readTask = async (req, res) => {
    try {
      const data = await User.readTask(req.params.pk);
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        message: error?.message || 'Unable read task',
        status: error?.status || 'failure',
      });
    }
};

const updateTask = async (req, res) => {
    try {
      const data = await User.updateTask(req.body);
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        message: error?.message || 'Unable to update task',
        status: error?.status || 'failure',
      });
    }
};

const deleteTask = async (req, res) => {
    try {
      const data = await User.deleteTask(req.body);
      res.status(data.statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        message: error?.message || 'Unable to delete task',
        status: error?.status || 'failure',
      });
    }
};

module.exports = { createuser, login, logout, createTask, readTask, updateTask, deleteTask }