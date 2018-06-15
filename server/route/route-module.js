const express = require('express')
const fs = require('fs')
const util = require('util') 
const path = require('path') 

const router = express.Router()
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const filePath = path.join(__dirname, '../../mocks/blocks/blocks.json')

//==============GET BLOCKS==============//
router.get('/blocks', (request, response, next) => {
  readFile(filePath, 'utf8')
  .then(data => {
    const blocks = JSON.parse(data)
    response.json(blocks)
  })
  .catch(next)
})
//==============POST BLOCK==============//
router.post('/blocks', (request, response, next) => {

  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      blocks.push({
        id: blocks.length,
        title: request.body.title,
        url: request.body.url,
        icon: request.body.color.split('-')[1] === "b" ?
        `img/icon-${request.body.icon}.png` :
        `img/icon-${request.body.icon}-blanc.png`,
        color: `#${request.body.color.split('-')[0]}`,
        titleColor: request.body.color.split('-')[1] === "b" ? "#292e2a" : "white",
        position: blocks.length + 1
      })
      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filePath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})

//==============POST UPDATE BLOCK==============//
router.post('/update-blocks', (request, response, next) => {

  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      const i = request.body.id
      blocks[i].title = request.body.title
      blocks[i].url = request.body.url
      blocks[i].icon = request.body.color.split('-')[1] === "b" ?
        `img/icon-${request.body.icon}.png` :
        `img/icon-${request.body.icon}-blanc.png`
      blocks[i].color = `#${request.body.color.split('-')[0]}`
      blocks[i].titleColor = request.body.color.split('-')[1] === "b" ? "#292e2a" : "white"

      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filePath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})

//==============DELETE BLOCK==============//
router.post('/delete-blocks', (request, response, next) => {

  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(async blocks => {

      const index = request.body.id
      // delete
      blocks.splice(index, 1)

      for (let i = 0 ; i < blocks.length ; i++) {
        blocks[i].id = i 
      }

      const content = JSON.stringify(blocks, null, 2)
      await writeFile(filePath, content, 'utf8')
      response.json(blocks)
    })
    .catch(next)
})

module.exports = router