import bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

const pass = await bcrypt.hashSync("123456", 10);

const Users = [
  {
    name: "John Doe",
    email: "john@doe.com",
    password: pass,
    isAdmin: true,
  },
  {
    name: "Thomas Edison",
    email: "thomas@adison.com",
    password: pass,
    isAdmin: false,
  },
  {
    name: "Jeff Bezos",
    email: "jeff@bezos.com",
    password: pass,
    isAdmin: false,
  },
];

export default Users;
// module.exports = Users;
