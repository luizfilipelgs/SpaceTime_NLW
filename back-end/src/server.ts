import { log } from 'console'
import fastify from 'fastify'

const app = fastify()

app.listen({
  port: 3333,
}).then(() => log('Server running on http://localhost:3333'))

app.get('/hello', () => 'hello word')