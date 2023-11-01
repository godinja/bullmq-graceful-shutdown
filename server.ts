import { worker, } from "./worker";

console.log("worker process has started...");

const workers = [worker];

worker.run();
console.log("started worker 1");

worker.on("active", (job) => {
  console.log(`job ${job.id} has started...`);
});

worker.on("completed", (job) => {
  console.log(`job ${job.id} has completed...`);
});

worker.on("failed", (job, error) => {
  console.log(`job ${job?.id} has failed: ${error}`);
});

process.on("SIGTERM", async () => {
  console.log("process interrupted");

  await Promise.allSettled(
    workers.map((worker) => {
      console.log(`Closing worker ${worker.name}`);
      return worker.close();
    })
  ).finally(() => {
    console.log('Closed all workers. Exiting process...');
    process.exit(0);
  });
});
