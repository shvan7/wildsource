const express = require('express')
const fs = require('fs')
const util = require('util') 
const path = require('path') 

const router = express.Router()
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const filePathUsers = path.join(__dirname, '../../mocks/users/users.json')

//==============GET BLOCKS==============//
router.get('/users', (request, response, next) => {
  readFile(filePathUsers, 'utf8')
  .then(data => {
    const blocks = JSON.parse(data)
    
    blocks.forEach(e => {
        delete e.password
    })
    
    response.json(blocks)
  })
  .catch(next)
})
//==============POST BLOCK==============//
router.post('/users', (request, response, next) => {

    console.log(request.body)
  readFile(filePathUsers, 'utf8')
    .then(JSON.parse)
    .then(async users => {
        users.push({
        id: users.length,
        username: request.body.username,
        password: request.body.password,
        admin: request.body.admin,
      })
      
      const content = JSON.stringify(users, null, 2)
      await writeFile(filePathUsers, content, 'utf8')
      response.json(users)
    })
    .catch(next)
})

//==============DELETE BLOCK==============//
router.post('/delete-users', (request, response, next) => {

  readFile(filePathUsers, 'utf8')
    .then(JSON.parse)
    .then(async users => {

      const index = request.body.id
      
      // delete
      users.splice(index, 1)

      for (let i = 0 ; i < users.length ; i++) {
        users[i].id = i 
      }

      const content = JSON.stringify(users, null, 2)
      await writeFile(filePathUsers, content, 'utf8')
      response.json(users)
    })
    .catch(next)
})

module.exports = router