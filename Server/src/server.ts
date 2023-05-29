import { log } from 'console'
import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = fastify()

app
  .listen({
    port: 3333,
  })
  .then(() => log('Server running on http://localhost:3333'))

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})
