import { worker, worker2 } from "./worker";
import { Worker } from "bullmq";

console.log("worker process has started...");

const workers = [worker, worker2];

worker.run();
console.log("started worker 1");
worker2.run();
console.log("started worker 2");

worker.on("active", (job) => {
  console.log(`job ${job.id} has started...`);
});

worker.on("completed", (job) => {
  console.log(`job ${job.id} has completed...`);
});

worker.on("failed", (job, error) => {
  console.log(`job ${job?.id} has failed: ${error}`);
});

const closeWorker = async (worker: Worker) => {
  console.log(`closing worker ${worker.name}`);
  await worker.close();
};

process.on("SIGINT", async () => {
  console.log("process interrupted");

  await Promise.all(workers.map(closeWorker));

  console.log("closed workers");
  process.exit(0);
});
