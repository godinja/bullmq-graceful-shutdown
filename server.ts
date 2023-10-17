import { worker } from "./worker";

console.log("worker process has started...");
worker.run();

worker.on("active", (job) => {
  console.log(`job ${job.id} has started...`);
});

worker.on("completed", (job) => {
  console.log(`job ${job.id} has completed...`);
});

worker.on("failed", (job, error) => {
  console.log(`job ${job?.id} has failed: ${error}`);
});

process.on("SIGINT", async () => {
  console.log("process interrupted");
  await worker.close();
  process.exit(0);
});
