import { Worker } from "bullmq";
import processor from "./processor";

export const worker = new Worker(
  "test",
  processor,
  {
    connection: { host: process.env.REDIS_HOST ?? 'localhost', port: 6379 },
  }
);