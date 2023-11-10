const fastify = require('fastify')();
const fs = require('fs');
const { exec } = require('shelljs');

const cors = require('@fastify/cors');

fastify.register(cors, {
  origin: ['http://localhost:5173'],
  // put your options here
});

fastify.get('/', async (request, reply) => {
  return { message: 'Hello, this is deps-analyzer-server' };
});

fastify.get('/echarts-example', async (req, reply) => {
  const graphData = await fetch(
    'https://echarts.apache.org/examples/data/asset/data/les-miserables.json'
  ).then((res) => res.json());
  return graphData;
});

fastify.get('/dependencies', async (request, reply) => {
  const res = fs.readFileSync('../dist/dependencies.json', 'utf-8');
  return JSON.parse(res);
});

fastify.post('/deps-update', async (request, reply) => {
  const res = exec('npx analyze');
  if (res.code === 0) {
    return {
      message: 'success',
      code: 0,
    };
  } else {
    return {
      message: 'failed',
      code: 1,
    };
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
