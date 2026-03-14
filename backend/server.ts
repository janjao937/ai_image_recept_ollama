import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import { Ollama } from 'ollama';
import sharp from 'sharp';
import { AllShopPromp } from "./content-promps.ts";

const fastify = Fastify({ logger: true });
const ollama = new Ollama({ host: process.env.OLLAMA_HOST || 'http://localhost:11434' });

fastify.register(cors);
fastify.register(multipart);

fastify.post('/api/scan', async (request, reply) => {
  const data = await request.file();
  if (!data) return reply.code(400).send({ error: 'No image provided' });

  try {
    const buffer = await data.toBuffer();
    // (Grayscale + Rotate auto)
    const processed = await sharp(buffer).rotate().grayscale().normalize().toBuffer();
    const base64 = processed.toString('base64');

    const response = await ollama.chat({
      model: 'llama3.2-vision',
      messages: [{
        role: 'user',
        // content: 'Scan receipt. Return ONLY JSON: {"store":"","items":[{"name":"","price":0}],"total":0}. Support Thai.',
        content: AllShopPromp,
        images: [base64]
      }],
      format: 'json',
      options: {
        temperature: 0,      
        top_p: 0.1,       
        num_predict: 1024 
      }
    });

    return JSON.parse(response.message.content);
  } catch (err) {
    return reply.code(500).send({ error: 'AI Processing Failed' });
  }
});

fastify.listen({ port: 3001, host: '0.0.0.0' });