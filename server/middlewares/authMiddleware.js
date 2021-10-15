import { verify } from 'jsonwebtoken';
import config from '../config/index';


exports.auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) { return res.status(403).send({ auth: false, message: 'No token provided.' }); }

  await verify(token, config.secretOrKey, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};
