import { Worker } from "bullmq";
import processor1 from "./processor1";

export const worker = new Worker(
  "test",
  processor1,
  {
    autorun: false,
    connection: { host: process.env.REDIS_HOST, port: 6379 },
    maxStalledCount: 0,
    lockDuration: 1000 * 60
  }
);