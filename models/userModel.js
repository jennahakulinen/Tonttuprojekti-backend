'use strict';

const users = [
  {
    // id: '1',
    Username: 'Joulupukki',
    Email: 'joulupukki@korvatunturi.fi',
    Password: '1234',
    Hometown: 'Rovaniemi',
    ProfilePic: 'https://im.mtv.fi/image/7646368/landscape16_9/1600/900/4678580b72d63463b0627ab101bcba02/zx/joulupukki-selfie.jpg',
  },
  {
    // id: '1',
    Username: 'TonttuToljanteri',
    Email: 'tonttu_t@korvatunturi.fi',
    Password: 'pipari',
    Hometown: 'Rovaniemi',
    ProfilePic: 'https://pbs.twimg.com/profile_images/932357001593704448/NdB2J4cm_400x400.jpg',
  },
  {
    // id: '1',
    Username: 'PetteriP',
    Email: 'punakuono@korvatunturi.fi',
    Password: 'asdf',
    Hometown: 'Rovaniemi',
    ProfilePic: 'https://cdn.shopify.com/s/files/1/2123/8425/products/18545272-LRG_530x.jpg?v=1578657616',
  },
];

const getUser = (Username) => {
  return users.find((user) => user.Username === Username);
};

module.exports = {
  users,
  getUser,
};
