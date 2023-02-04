// /controllers/api/users.js

const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Board = require("../../models/board");
const List = require("../../models/list");
const Card = require("../../models/card");

const checkToken = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.exp);
};

const dataController = {
  //Index
  //This just gives us the boards for that id

  async index(req, res, next) {
    try {
      const userBoards = await Board.find({ user: req.params.id });
      const user = await User.find({});
      if (!user) throw new Error();
      res.locals.data.user = user;
      res.locals.data.user[0].boards = userBoards;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async create(req, res, next) {
    try {
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (e) {
      res.status(400).json(e);
    }
  },
  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch {
      res.status(400).json("Bad Credentials");
    }
  },
};

const apiController = {
  auth(req, res) {
    res.json(res.locals.data.token);
  },
  index(req, res, next) {
    res.json(res.locals.data.user);
  },
  show(req, res, next) {
    res.json(res.locals.data.user);
  },
};

module.exports = {
  checkToken,
  dataController,
  apiController,
};

/* -- Helper Functions -- */
// Needed to use a regular function, add it at the end, for hoisting
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
