import { z } from 'zod'
import { prisma } from './lib/prisma'
import { FastifyInstance } from 'fastify'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat('...'),
    }))
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    })

    return memory
  })

  app.post('/memories', async (request) => {
    const memorySchema = z.object({
      coverUrl: z.string(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { coverUrl, content, isPublic } = memorySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'd1e0aa16-200d-4147-b000-877e9e87c487',
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request) => {
    const memorySchema = z.object({
      coverUrl: z.string(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const idSchema = z.object({
      id: z.string().uuid(),
    })

    const { coverUrl, content, isPublic } = memorySchema.parse(request.body)
    const { id } = idSchema.parse(request.params)

    const memoryUpdated = await prisma.memory.update({
      where: { id },
      data: {
        coverUrl,
        content,
        isPublic,
      },
    })

    return memoryUpdated
  })

  app.delete('/memories/:id', async (request) => {
    const idSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = idSchema.parse(request.params)

    await prisma.memory.delete({
      where: { id },
    })
  })
}
