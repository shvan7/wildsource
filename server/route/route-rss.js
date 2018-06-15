const express = require('express')
const Parser = require('rss-parser')

const router = express.Router()
const parser = new Parser()

router.get('/get-rss', async (req, res) => {
  const feed = await parser.parseURL('https://c.developpez.com/index/rss')
  res.json(feed)
})

module.exports = router