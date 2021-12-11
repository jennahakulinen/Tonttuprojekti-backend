"use strict";
// userController

const userModel = require('../models/userModel');

const { getUser, getAllUsers, addUser} = userModel;

const user_list_get = async (req, res, next) => {
    try {
      const users = await getAllUsers(next);
      if (users.length > 0) {
        res.json(users);
      } else {
        next('No users found', 404);
      }
    } catch (e) {
      console.log('user_list_get error', e.message);
      next(httpError('internal server error', 500));
    }
  };

  const user_get = async (req, res, next) => {
    try {
      const vastaus = await getUser(req.params.id, next);
      if (vastaus.length > 0) {
        res.json(vastaus.pop());
      } else {
        next(httpError('No user found', 404));
      }
    } catch (e) {
      console.log('user_get error', e.message);
      next(httpError('internal server error', 500));
    }
  };

  const user_post = async (req, res, next) => {
    try {
      console.log('lomakkeesta', req.body);
      const { email, username, city, password, filename } = req.body;
      const tulos = await addUser(email, username, city, password, filename, next);
      if (tulos.affectedRows > 0) {
        res.json({
          message: 'user added',
          username: tulos.insertId,
        });
      } else {
        next(httpError('No user inserted', 400));
      }
    } catch (e) {
      console.log('user_post error', e.message);
      next(httpError('internal server error', 500));
    }
  };
  

// const user_list_get = (req, res, next) => {
//     const newUsers = users.map((user) => {
//         delete user.Password;
//         return user;
//     });
//     res.json(newUsers);
// };

// const user_get = (req, res) => {
//     const vastaus = getUser(req.params.id);
//     delete vastaus.Password;
//     res.json(vastaus);
// };

// const user_post = (req, res) => {
//     console.log(req.body);
//     res.send('With this endpoint you can add users');
// };

module.exports = {
    user_list_get,
    user_get,
    user_post,
};