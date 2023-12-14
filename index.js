import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/routes.js'

import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//! Variables
const app = express()
const port = process.env.PORT
const connectionString = process.env.CONNECTION_STRING

//! Middleware 
app.use(express.json())
app.use((req, res, next) => {
  console.log(`REQUEST RECEIVED: ${req.method} ${req.originalUrl}`)
  next()
})

//! Endpoints
app.use('/api', router)
app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})




// Start servers
async function startServer() {
  try {
    // Establish a connection to the MongoDB database (Atlas)
    await mongoose.connect(connectionString)
    console.log('✅ Database connection established')
    // Listen
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`))
  } catch (error) {
    console.log('🚨 Error connection')
    console.log(error)
  }
}
startServer()




