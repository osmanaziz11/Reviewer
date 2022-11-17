var users = require('../../db/models/users');
const bcrypt = require('bcryptjs');

const securePassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};
const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
const isValid = async (val) => {
  const result = await users.findOne({
    Username: val,
  });
  console.log(result);
  if (result != null) {
    return false;
  } else {
    return true;
  }
};
module.exports = { securePassword, comparePassword, isValid };
