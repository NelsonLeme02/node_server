'use strict'
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const dbPath = path.resolve(__dirname, './db/facts.json')
const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

app.use(morgan('dev'))

app.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8',)
        const facts = JSON.parse(data)
        return res.status(200).json(facts)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ erro: 'Erro de execução!' })
    } 
})


app.listen(port, () => {
  console.log(`Running on ${port}`)
})