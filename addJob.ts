import { queue, queue2 } from "./worker";

(async () => {
  const job = await queue.add("test", {});
  console.log("Added a job");
  console.log(job);

  const job2 = await queue2.add("test", {});
  process.exit(0);
})();
