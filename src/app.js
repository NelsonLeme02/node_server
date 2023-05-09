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

app.get('/:id', (req, res) => {
    const id = req.params
    try {
        var data_id = fs.readFileSync(dbPath, 'utf8')
        var fact = null
        data_id = JSON.parse(data_id)['facts']

        for (index in data_id) {
            if (data_id[index]['id'] == id) {
                fact = data_id[index]
                break
            }
        }
        if (fact === null) {
            return res.status(404).json({ erro: 'Nenhum fato foi encontrado!' })
        }
        return res.json(fact)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({erro: 'Não foi possível executar esta operação!' }) 
    }
})

app.post('/', (req, res) => {
   
    const { text } = req.body
    try {
        let data = fs.readFileSync(dbPath, 'utf8')
        data = JSON.parse(data)
        const newFact = {
            id: String(data['facts'].length + 1),
            text: text,
            type: 'cat',
            upvotes: 0,
        } 
        data['facts'].push(newFact)


app.listen(port, () => {
  console.log(`Running on ${port}`)
})