import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { Ollama } from 'ollama';
import sharp from 'sharp';

const fastify = Fastify({ logger: true });
const ollama = new Ollama({ host: process.env.OLLAMA_HOST || 'http://localhost:11434' });

fastify.register(cors);
fastify.register(multipart);

fastify.post('/api/scan', async (request, reply) => {
  const data = await request.file();
  if (!data) return reply.code(400).send({ error: 'No image provided' });

  try {
    const buffer = await data.toBuffer();
    // ปรับภาพให้ AI อ่านง่าย (Grayscale + Rotate auto)
    const processed = await sharp(buffer).rotate().grayscale().normalize().toBuffer();
    const base64 = processed.toString('base64');

    const response = await ollama.chat({
      model: 'llama3.2-vision',
      messages: [{
        role: 'user',
        content: 'Scan receipt. Return ONLY JSON: {"store":"","items":[{"name":"","price":0}],"total":0}. Support Thai.',
        images: [base64]
      }],
      format: 'json'
    });

    return JSON.parse(response.message.content);
  } catch (err) {
    return reply.code(500).send({ error: 'AI Processing Failed' });
  }
});

fastify.listen({ port: 3001, host: '0.0.0.0' });