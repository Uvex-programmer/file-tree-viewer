import express from 'express'
import api from './routes/routes.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.static(path.join(__dirname, '/build')))
app.use('/api', api)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
