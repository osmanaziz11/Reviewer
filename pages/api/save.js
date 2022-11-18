// API Route to save report
// {
//
// }

require('../../db/config');
import { securePassword } from '../../db/util/functions';
var report = require('../../db/models/report');
export default async function handler(req, res) {
  if (req.method == 'POST') {
    console.log(req.body.initialRepo[0]);
    try {
      const create = new report(req.body);
      await create.save();
      res.status(201).send({ message: 'success', status: 1 });
    } catch (error) {
      res.status(403).send({ message: error.message, status: 0 });
    }
  }
}
