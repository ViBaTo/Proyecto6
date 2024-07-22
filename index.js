require('dotenv').config()
const express = require('express')
const composerRoutes = require('./src/api/routes/Composers')
const symphonyRoutes = require('./src/api/routes/Symphonies')
const { connectDB } = require('./src/config/db')
const app = express()

connectDB()

app.use(express.json())

app.use('/api/v1/composers', composerRoutes)
app.use('/api/v1/symphonies', symphonyRoutes)

app.use('/ping', (req, res, next) => {
  return res.status(200).json('pong')
})

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor desplegado en http://localhost:3000')
})
