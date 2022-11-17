// API Route to create account
// {
//   username:" ",
// name:"",
// password:"",
// email:""
// }

require('../../db/config');
import { securePassword } from '../../db/util/functions';
var users = require('../../db/models/users');
export default async function handler(req, res) {
  if (req.method == 'POST') {
    req.body.Password = await securePassword(req.body.Password);
    console.log(req.body);
    try {
      const create = new users(req.body);
      await create.save();
      res.status(201).send({ message: 'success', status: 1 });
    } catch (error) {
      res.status(403).send({ message: error.message, status: 0 });
    }
  }
}
