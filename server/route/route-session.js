const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const fs = require('fs')
const util = require('util') 
const path = require('path')

const readFile = util.promisify(fs.readFile)

const app = express()
const router = express.Router()
const secret = 'KIKOO'

const filePathUsers = path.join(__dirname, '../../mocks/users/users.json')

//==============LOG IN==============//
router.use(session({
    secret,
    saveUninitialized: false,
    resave: true,
    store: new FileStore({ secret }),
    unset: 'destroy',
  }))
  
  router.get('/secure', (req, res) => {
    if (req.session.user !== undefined) {
      res.json(req.session.user)
    } else {
      res.json('access denied')
    }
 })
  
  router.post('/log-in', (req, res, next) => {
    readFile(filePathUsers, 'utf8')
    .then(users => JSON.parse(users))
    .then(users => {
      const user = users.find(u => req.body.username === u.username)
      if (!user) {
        return res.json('User not found')
      }
  
      if (user.password !== req.body.password) {
        return res.json('Wrong password')
      }
  
      req.session.user = user
      user.sessionID = req.sessionID
      delete user.password

      res.json(user)
      console.log(user, 'user trouvé')
    })
  })

  router.get('/log-out', (req, res) => {
    req.session.destroy(err => {
      console.log(err)
    })
 })

  router.use((err, req, res, next) => {
    if (err) {
      res.json({ message: err.message })
      console.error(err)
    }
    next(err)
  })

  module.exports = router