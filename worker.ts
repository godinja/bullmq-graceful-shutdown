import { Worker } from "bullmq";
import processor from "./processor";

export const worker = new Worker(
  "test",
  processor,
  {
    autorun: false,
    connection: { host: process.env.REDIS_HOST, port: 6379 },
  }
);