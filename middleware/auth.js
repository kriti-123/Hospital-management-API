const jwt = require('jsonwebtoken');
const util = require('util');
const AppError = require('../utils/appError');
require('dotenv').config()
module.exports.authenticate = async function (req, res, next) {
  try {
    const testoken = req.headers.autherization;
    if(!testoken) next();
    let token;
    if (testoken && testoken.startsWith('bearer')) {
      token = testoken.split(' ')[1];
      console.log(token);
    }
    if (!token) {
      next();
    }
    const decoded = jwt.verify(token, 'kritishreehellop');
    if (!decoded) {
      throw new AppError('token expired', 404);
    }
    // console.log(decoded)
    next();
  }

  catch (e) {
    next(e);
  }
}
