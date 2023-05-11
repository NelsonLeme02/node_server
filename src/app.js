const port = 3000
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const app = express()

app.use(express.json())

app.use(cors())

app.use(morgan('dev'))

app.use('/', routes)


