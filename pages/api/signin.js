// API Route to create account
// {
//   Username:" ",
// Password:"",
// }
require('../../db/config');
import { comparePassword } from '../../db/util/functions';
var users = require('../../db/models/users');

export default async function handler(req, res) {
  try {
    const result = await users.find({
      Username: req.body.Username,
    });
    if (result.length > 0) {
      if (await comparePassword(req.body.Password, result[0].Password)) {
        res
          .status(200)
          .send({ message: 'Login successful', body: result, status: 1 });
      } else {
        res.status(200).send({ message: 'Invalid Password', status: 0 });
      }
    } else {
      res.status(200).send({ message: 'Invalid Credentials', status: -1 });
    }
  } catch (error) {
    res.status(403).send({ message: error.message, record: undefined });
  }
}
