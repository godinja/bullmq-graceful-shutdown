import { Queue, Worker } from "bullmq";

export const worker = new Worker(
  "test",
  async () => {
    console.log("this is a test job");

    const time = 20;

    for (let i = 1; i < time; i++) {
      console.log(`worker 1: sleeping...: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("finished sleeping");
  },
  {
    autorun: false,
    connection: { host: process.env.REDIS_HOST, port: 6379 },
  }
);

export const worker2 = new Worker(
  "test2",
  async () => {
    console.log("this is a test job");

    const time = 10;

    for (let i = 1; i < time; i++) {
      console.log(`worker 2: sleeping...: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("finished sleeping");
  },
  {
    autorun: false,
    connection: { host: process.env.REDIS_HOST, port: 6379 },
  }
);

export const queue = new Queue("test", {
  connection: { host: process.env.REDIS_HOST, port: 6379 },
});

export const queue2 = new Queue("test2", {
  connection: { host: process.env.REDIS_HOST, port: 6379 },
});
