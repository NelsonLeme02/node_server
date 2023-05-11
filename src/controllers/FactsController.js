const path = require('path')
const fs = require('fs')
const dbPath = path.resolve(__dirname, '../db/facts.json')
class FactsController {
    index(req, res) {
        try {
            const data = fs.readFileSync(dbPath, 'utf8',)
            const facts = JSON.parse(data)
            return res.status(200).json(facts)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ erro: 'Erro de execução!' })
        } 
    }
    show(req, res) {
        const { id } = req.params
        try {
            let data = fs.readFileSync(dbPath, 'utf8')
            let fact = null
            data = JSON.parse(data)['facts']

            for (let index in data) {
                if (data[index]['id'] == id) {
                    fact = data[index]
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
            return res.status(500).json({ erro: 'Não foi possível executar esta operação!' })
        }
    }
    create(req, res) {
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
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return res.json(newFact)
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ erro: 'Não foi possível executaresta operação!' })
        }
    }
    update(req, res) {
        const { id } = req.params
        const { text } = req.body
        try {
            let data = fs.readFileSync(dbPath, 'utf8')
            let fact = null
            let indexFact = null
            data = JSON.parse(data)
            for (let index in data['facts']) {
                if (data['facts'][index]['id'] == id) {
                    fact = data['facts'][index]
                    indexFact = index
                    break
                }
            }
            if (fact === null) {
                return res.status(404).json({ erro: 'Nenhum fato foi encontrado!' })
            }
            const updatedFact = {
                ...data['facts'][indexFact], text: text,
            }
            data['facts'][indexFact] = updatedFact
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return res.status(200).json(updatedFact)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ erro: 'Não foi possível executar esta operação!' })
        }
    }
    delete(req, res) {
        const { id } = req.params
        try {
            let data = fs.readFileSync(dbPath, 'utf8')
            let indexFact = null
            data = JSON.parse(data)
            for (let index in data['facts']) {
                if (data['facts'][index]['id'] == id) {
                    indexFact = index
                    break
                }
            }
            if (indexFact == null) {
                return res
                    .status(404).json({ erro: 'Nenhum fato foi encontrado!' })
            }
            data['facts'].splice(indexFact, 1)
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return res.sendStatus(204)
            return res()
        } catch (e) {
            console.log(e)
            return res
                .status(500)
                .json({ erro: 'Não foi possível executar esta operação!' })
        }
    }
}
module.exports = FactsController