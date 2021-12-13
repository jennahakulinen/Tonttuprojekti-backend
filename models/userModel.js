'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT Username, Email, Hometown, ProfilePic, Role FROM Cookmas_User'
    );
    return rows;
  } catch (e) {
    console.error('getAllUsers error', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (Username, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT Username, Email, Hometown, ProfilePic, Role FROM Cookmas_User WHERE Username = ?',[Username]);
    return rows;
  } catch (e) {
    console.error('getUser error', e.message);
    next(httpError('Database error', 500));
  }
};

const addUser = async (Username, Email, Password, Hometown, ProfilePic, Role, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO Cookmas_User (Username, Email, Password, Hometown, ProfilePic, Role) VALUES (?, ?, ?, ?, ?)',
      [Username, Email, Password, Hometown, ProfilePic, Role]
    );
    return rows;
  } catch (e) {
    console.error('addUser error', e.message);
    next(httpError('Database error', 500));
  }
};

// const users = [
//   {
//     // id: '1',
//     Username: 'Joulupukki',
//     Email: 'joulupukki@korvatunturi.fi',
//     Password: '1234',
//     Hometown: 'Rovaniemi',
//     ProfilePic: 'https://im.mtv.fi/image/7646368/landscape16_9/1600/900/4678580b72d63463b0627ab101bcba02/zx/joulupukki-selfie.jpg',
//   },
//   {
//     // id: '1',
//     Username: 'TonttuToljanteri',
//     Email: 'tonttu_t@korvatunturi.fi',
//     Password: 'pipari',
//     Hometown: 'Rovaniemi',
//     ProfilePic: 'https://pbs.twimg.com/profile_images/932357001593704448/NdB2J4cm_400x400.jpg',
//   },
//   {
//     // id: '1',
//     Username: 'PetteriP',
//     Email: 'punakuono@korvatunturi.fi',
//     Password: 'asdf',
//     Hometown: 'Rovaniemi',
//     ProfilePic: 'https://cdn.shopify.com/s/files/1/2123/8425/products/18545272-LRG_530x.jpg?v=1578657616',
//   },
// ];

// const getUser = (Username) => {
//   return users.find((user) => user.Username === Username);
// };

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};
