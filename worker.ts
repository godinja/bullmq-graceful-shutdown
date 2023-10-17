import { Queue, Worker } from "bullmq";

export const worker = new Worker("test", async () => {}, { autorun: false });

export const queue = new Queue("test");
