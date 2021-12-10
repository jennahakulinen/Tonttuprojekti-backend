'use strict';

const pool = require('../database/db');
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT Username, Email, Password, Hometown, ProfilePic, Role FROM Cookmas_User');
    return rows;
  } catch (e) {
    console.error('getAllUsers error', e.message);
    next (httpError('Database error', 500));
  }
};

const getUser = async (id, next) => {
  try {
    const [rows] = await promisePool.execute('SELECT Username, Email, Password, Hometown, ProfilePic, Role FROM Cookmas_User WHERE Username = ?', [id]);
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    next (httpError('Database error', 500));
  }
};

const addUser = async (Username, Email, Password, Hometown, ProfilePic, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO Cookmas_User (Username, Email, Password, Hometown, ProfilePic) VALUES (?, ?, ?, ?, ?)', 
      [Username, Email, Password, Hometown, ProfilePic]
    );
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    next (httpError('Database error', 500));
  }
};

const getUserLogin = async (params) => {
  try {
    console.log('getUserLogin', params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM Cookmas_User WHERE Email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('getUserLogin error', e.message);
    next (httpError('Database error', 500));
  }
};


module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
};
