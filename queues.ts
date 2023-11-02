import { Queue } from "bullmq";

export const queue = new Queue("test", {
  connection: { host: process.env.REDIS_HOST ?? 'localhost', port: 6379 },
});