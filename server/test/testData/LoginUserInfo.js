const randchar = Math.random().toString(36).substr(2, 5);

/** This module is user for creating the User Data * */

exports.UserLoginData = {
  VALID_USER_CREDENTIALS: { username: 'test2', password: 'Hfdsjgjdsgdsjhkjjksdgk' },
  INVALID_USER_CREDENTIALS: { username: `${randchar}@hjcsjh.com`, password: 'Password' },
  USER_DETAILS: { username: `${randchar}`, password: `${randchar}`, role: 'Seller' }

};
