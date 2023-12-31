import { Job } from "bullmq";

export default async function processor (job: Job) {
    const time = process.env.JOB_DURATION ? parseInt(process.env.JOB_DURATION) : 45;

    for (let i = 1; i < time; i++) {
      console.log(`queue = ${job.queueName}, job id = ${job.id}: sleeping...: ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("finished sleeping");
}