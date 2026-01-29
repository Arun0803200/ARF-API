const cluster = require('cluster');
const os = require('os');
const express = require('express');
const connectDB = require('./Config/Database');
const cors = require('cors');
const dotenv = require('dotenv');
const { eventLogMiddleware, errorHandler } = require('./Middlewares/EventLogMiddleware');
const { sanitizeMiddleware } = require('./Middlewares/SanitizerMiddleware');

const { router: userRoutes } = require('./Routes/UserRoutes');

dotenv.config();
const app = express();

// API-docs
app.use('/api-docs', express.static('docs'));

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({ origin: true, credentials: true }));

app.use(eventLogMiddleware);
app.use(sanitizeMiddleware);

app.use('/api/v1/user', userRoutes);

// Health check / root
app.get('/', (req, res) => {
  return res.status(200).send({
    sts: 0,
    msg: 'API running successfully',
  });
});

app.use(errorHandler);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

if (cluster.isPrimary) {
  // PRIMARY PROCESS — RUN CRON JOBS & SPAWN WORKERS
  console.log(`Primary ${process.pid} starting...`);

  // Connect DB only for cron
  connectDB();
  console.log('DB connected in Primary for cron job');


  // Limit workers (max 4)
  const cpuCount =
    process.env.ENVIRONMENT === 'production'
      ? os.cpus().length
      : 1;
  const workers = Math.min(cpuCount, 4);

  console.log(`Primary forking ${workers} workers...`);

  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Spawning new...`);
    cluster.fork();
  });

} else {
  // WORKER PROCESS — API SERVER
  connectDB();   // connect once for worker
  console.log(`Worker ${process.pid} connected to DB`);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}
