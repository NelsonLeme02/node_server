'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const port = 3000

app.use(express.json())

app.use(cors())

app.use(morgan('dev'))

app.get('/', (req, res) => {
    return res.send('ok')
})

app.listen(port, () => {
  console.log(`Running on ${port}`)
})