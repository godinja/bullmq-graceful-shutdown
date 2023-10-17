import { Queue, Worker } from "bullmq";

export const worker = new Worker("test", async () => {}, {
  autorun: false,
  // connection: { host: "bullmq-redis-master" },
});

export const queue = new Queue("test", {
  // connection: { host: "bullmq-redis-master" },
});
