const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  return { message: 'Hell, World!' };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
