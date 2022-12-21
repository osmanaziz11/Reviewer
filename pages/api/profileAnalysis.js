// API Route to fetch testing data
// {
//   url:" ",
// }
import data from './data/testing';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    var resp = 0;
    try {
      data.map((item, index) => {
        if (item.id == url) {
          resp = item.users;
        }
      });
      res.status(200).send({ status: 1, body: resp });
    } catch (error) {
      res.status(403).send({ message: error.message, record: undefined });
    }
  }
}
