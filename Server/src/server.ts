import { log } from 'console'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
  origin: true,
})

app
  .listen({
    port: 3333,
  })
  .then(() => log('Server running on http://localhost:3333'))

app.register(memoriesRoutes)
