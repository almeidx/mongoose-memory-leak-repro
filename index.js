require('dotenv/config');

const { connect, connection } = require('mongoose');
const { performance } = require('perf_hooks');
const Guild = require('./database/guild');

connection
  .on('connected', () => console.log('[MONGO] Connected.'))
  .on('disconnect', () => console.log('[MONGO] Disconnected.'))
  .on('error', (err) => console.error('[MONGO] Error:', err));

connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => {
  throw err;
});

(async () => {
  setInterval(() => {
    console.log('[Timer] Memory usage:', process.memoryUsage().heapUsed / (1024 ** 2));
  }, 10_000);

  const startTime = performance.now();

  const result = await Guild.find({
    $or: [
      { premium: { $eq: true } },
      { prefix: { $ne: 'p!' } },
      { blacklistedChannels: { $exists: true, $ne: [], $type: 'array' } },
    ],
  });

  console.log('Query has finished. Took %d ms to find %d documents', performance.now() - startTime, result.length);
  console.log('Memory Usage:', process.memoryUsage().heapUsed / (1024 ** 2))
})();
