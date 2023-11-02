import { queue } from "./queues";

(async () => {
  const job = await queue.add("test", {});
  console.log("Added a job");
  console.log(job);

  process.exit(0);
})();
