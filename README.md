# BullMQ Graceful Shutdown

This repo contains a minimal producible example demonstrating some weird behavior related to job locks and graceful shutdown of workers.

# Redis

Ensure Redis is running. The default connection is to `localhost` but it can be configured by supplying the `REDIS_HOST` environment variable.

# Steps to Reproduce

```sh
# Install the packages
yarn

# Build the TypeScript
yarn build

# Start the worker
yarn start

# Add a job
yarn add-job

# Kill the worker
yarn kill

# Start another worker
yarn start
```

# Observation

It appears that the worker fails to renew the lock for the job. The job then goes into the `stalled` state and gets processed again by the new worker.

This seems to only happen when the job takes longer than 30 seconds. The default lock duration is 30 seconds. So it seems as though the worker does not continuously renew job locks after `worker.close()` has been called.