const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const app = express()
const port = 3000


app.use(express.json())

app.use(cors())

app.use(morgan('dev'))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Running on ${port}`)
})


