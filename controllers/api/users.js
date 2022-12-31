// /controllers/api/users.js

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
  console.log('req.user', req.user)
  res.json(req.exp)
}

const dataController = {
      //Index
      index(req, res, next)
      {
          User.find({}).populate('users').exec((err, usersDocuments)=>{
              if(err){
                  res.satus(400).send({
                      msg:err.message,
                  })
              }else{
                  res.locals.data.user = usersDocuments
                  next()
              }
          })
      },
  async create (req, res, next) {
    try {
      const user = await User.create(req.body)
      // token will be a string
      const token = createJWT(user)
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user
      res.locals.data.token = token
      next()
    } catch (e) {
      res.status(400).json(e)
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error()
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error()
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Bad Credentials')
    }
  }
}

const apiController = {
  auth (req, res) {
    res.json(res.locals.data.token)
  },
  index(req, res, next){
    res.json(res.locals.data.users)
  },
  show(req, res, next){
    res.json(res.locals.data.users)
  }
}

module.exports = {
  checkToken,
  dataController,
  apiController
}

/* -- Helper Functions -- */
// Needed to use a regular function, add it at the end, for hoisting 
function createJWT (user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}