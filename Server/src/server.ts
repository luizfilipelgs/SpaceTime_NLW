import { log } from 'console'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app
  .listen({
    port: 3333,
  })
  .then(() => log('Server running on http://localhost:3333'))

app.register(memoriesRoutes)
