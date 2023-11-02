import { worker, } from "./worker";

console.log("worker process has started...");

worker.on("active", (job) => {
  console.log(`job ${job.id} has started...`);
});

worker.on("completed", (job) => {
  console.log(`job ${job.id} has completed...`);
});

worker.on("failed", (job, error) => {
  console.log(`job ${job?.id} has failed: ${error}`);
});

worker.on("error", (error) => {
  console.error(`worker error ${error}`);
});

worker.on('ioredis:close', () => {
  console.log('closed redis connection');
})

worker.on('stalled', (jobId) => {
  console.log(`job ${jobId} has stalled`)
})

process.on("SIGTERM", async () => {
  console.log("process interrupted");

  console.log(`Closing worker ${worker.name}`);
  await worker.close();

  console.log('Closed all workers. Exiting process...');
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error({ promise, reason }, "Unhandled Rejection at: Promise");
});