// API Route to check if username Exist
// {
//   username:" "
// }
require('../../db/config');
import { isValid } from '../../db/util/functions';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    if (!(await isValid(req.body.Username))) {
      res.status(200).send({ message: 'Username already exists', status: 1 });
    } else {
      res.status(201).send({ message: 'Username available', status: 0 });
    }
  }
}
