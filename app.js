import express, { json } from 'express' // require -> commonJS
import moviesRuter from './routes/moviesRouter.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.use('/movies', moviesRuter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
