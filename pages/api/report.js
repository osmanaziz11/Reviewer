// API Route to create account
// {
//   Username:" ",
// }
// require('../../db/config');
import { CiAlignRight } from 'react-icons/ci';
import { comparePassword } from '../../db/util/functions';
// var users = require('../../db/models/report');

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const result = await users.find({
        username: req.body.Username,
      });
      if (result.length > 0) {
        res.status(200).send({ message: 'finds', body: result, status: 1 });
      } else {
        res.status(200).send({ message: 'notfound', status: 0 });
      }
    } catch (error) {
      res.status(403).send({ message: error.message, record: undefined });
    }
  }
}
