# BullMQ Graceful Shutdown

This repo contains a minimal producible example demonstrating some weird behavior related to job locks and graceful shutdown of workers in a Kubernetes environment.

# Steps to Reproduce

### Build the Docker Image

```
docker build -t bullmq-graceful-shutdown .
```

### Install the Helm Chart

```
helm install bullmq-graceful-shutdown chart
```

### Add a Job to the Queue

```
kubectl exec <bullmq-graceful-shutdown-pod-name> -- node build/addJob.js
```

### Upgrade the Helm Chart

```
docker tag bullmq-graceful-shutdown:latest bullmq-graceful-shutdown:v2

helm upgrade bullmq-graceful-shutdown chart --set image.tag=v2
```

### Observe Pod Logs

There should be two bullmq-graceful-shutdown pods - one in the "Running" state and the other in the "Terminating" state. The Terminating pod will have the worker close and continue to process the in progress job. When the job finishes, it will either throw a `Error: Lock mismatch for job 1. Cmd failed from active` error or `Error: Missing lock for job 1. failed` error. The new pod that is running will process the same job for a second time.

<details><summary>Original Pod Logs (latest tag)</summary>

```
worker process has started...
started worker 1
job 1 has started...
worker 1, job id = 1: sleeping...: 1
worker 1, job id = 1: sleeping...: 2
worker 1, job id = 1: sleeping...: 3
worker 1, job id = 1: sleeping...: 4
worker 1, job id = 1: sleeping...: 5
worker 1, job id = 1: sleeping...: 6
worker 1, job id = 1: sleeping...: 7
worker 1, job id = 1: sleeping...: 8
worker 1, job id = 1: sleeping...: 9
worker 1, job id = 1: sleeping...: 10
worker 1, job id = 1: sleeping...: 11
worker 1, job id = 1: sleeping...: 12
process interrupted
Closing worker test
worker 1, job id = 1: sleeping...: 13
worker 1, job id = 1: sleeping...: 14
worker 1, job id = 1: sleeping...: 15
worker 1, job id = 1: sleeping...: 16
worker 1, job id = 1: sleeping...: 17
worker 1, job id = 1: sleeping...: 18
worker 1, job id = 1: sleeping...: 19
worker 1, job id = 1: sleeping...: 20
worker 1, job id = 1: sleeping...: 21
worker 1, job id = 1: sleeping...: 22
worker 1, job id = 1: sleeping...: 23
worker 1, job id = 1: sleeping...: 24
worker 1, job id = 1: sleeping...: 25
worker 1, job id = 1: sleeping...: 26
worker 1, job id = 1: sleeping...: 27
worker 1, job id = 1: sleeping...: 28
worker 1, job id = 1: sleeping...: 29
worker 1, job id = 1: sleeping...: 30
worker 1, job id = 1: sleeping...: 31
worker 1, job id = 1: sleeping...: 32
worker 1, job id = 1: sleeping...: 33
worker 1, job id = 1: sleeping...: 34
worker 1, job id = 1: sleeping...: 35
worker 1, job id = 1: sleeping...: 36
worker 1, job id = 1: sleeping...: 37
worker 1, job id = 1: sleeping...: 38
worker 1, job id = 1: sleeping...: 39
worker 1, job id = 1: sleeping...: 40
worker 1, job id = 1: sleeping...: 41
worker 1, job id = 1: sleeping...: 42
worker 1, job id = 1: sleeping...: 43
worker 1, job id = 1: sleeping...: 44
worker 1, job id = 1: sleeping...: 45
worker 1, job id = 1: sleeping...: 46
worker 1, job id = 1: sleeping...: 47
worker 1, job id = 1: sleeping...: 48
worker 1, job id = 1: sleeping...: 49
worker 1, job id = 1: sleeping...: 50
worker 1, job id = 1: sleeping...: 51
worker 1, job id = 1: sleeping...: 52
worker 1, job id = 1: sleeping...: 53
worker 1, job id = 1: sleeping...: 54
worker 1, job id = 1: sleeping...: 55
worker 1, job id = 1: sleeping...: 56
worker 1, job id = 1: sleeping...: 57
worker 1, job id = 1: sleeping...: 58
worker 1, job id = 1: sleeping...: 59
worker 1, job id = 1: sleeping...: 60
worker 1, job id = 1: sleeping...: 61
worker 1, job id = 1: sleeping...: 62
worker 1, job id = 1: sleeping...: 63
worker 1, job id = 1: sleeping...: 64
worker 1, job id = 1: sleeping...: 65
worker 1, job id = 1: sleeping...: 66
worker 1, job id = 1: sleeping...: 67
worker 1, job id = 1: sleeping...: 68
worker 1, job id = 1: sleeping...: 69
worker 1, job id = 1: sleeping...: 70
worker 1, job id = 1: sleeping...: 71
worker 1, job id = 1: sleeping...: 72
worker 1, job id = 1: sleeping...: 73
worker 1, job id = 1: sleeping...: 74
worker 1, job id = 1: sleeping...: 75
worker 1, job id = 1: sleeping...: 76
worker 1, job id = 1: sleeping...: 77
worker 1, job id = 1: sleeping...: 78
worker 1, job id = 1: sleeping...: 79
worker 1, job id = 1: sleeping...: 80
worker 1, job id = 1: sleeping...: 81
worker 1, job id = 1: sleeping...: 82
worker 1, job id = 1: sleeping...: 83
worker 1, job id = 1: sleeping...: 84
worker 1, job id = 1: sleeping...: 85
worker 1, job id = 1: sleeping...: 86
worker 1, job id = 1: sleeping...: 87
worker 1, job id = 1: sleeping...: 88
worker 1, job id = 1: sleeping...: 89
finished sleeping
Error: Lock mismatch for job 1. Cmd failed from active
    at Scripts.finishedErrors (/node_modules/bullmq/dist/cjs/classes/scripts.js:221:24)
    at Job.moveToFailed (/node_modules/bullmq/dist/cjs/classes/job.js:427:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async handleFailed (/node_modules/bullmq/dist/cjs/classes/worker.js:335:21)
    at async Worker.retryIfFailed (/node_modules/bullmq/dist/cjs/classes/worker.js:535:24)
Closed all workers. Exiting process...
rpc error: code = Unknown desc = Error: No such container: 5ada8d0bc1d9714e2e127ec73b29d209e7d2a536e90b5fb4f8d65d800f1272b3
```

</details>

<details><summary>New Pod Logs (v2 tag)</summary>

```
worker process has started...
started worker 1
job 1 has started...
worker 1, job id = 1: sleeping...: 1
worker 1, job id = 1: sleeping...: 2
worker 1, job id = 1: sleeping...: 3
worker 1, job id = 1: sleeping...: 4
worker 1, job id = 1: sleeping...: 5
worker 1, job id = 1: sleeping...: 6
worker 1, job id = 1: sleeping...: 7
worker 1, job id = 1: sleeping...: 8
worker 1, job id = 1: sleeping...: 9
worker 1, job id = 1: sleeping...: 10
worker 1, job id = 1: sleeping...: 11
worker 1, job id = 1: sleeping...: 12
worker 1, job id = 1: sleeping...: 13
worker 1, job id = 1: sleeping...: 14
worker 1, job id = 1: sleeping...: 15
worker 1, job id = 1: sleeping...: 16
worker 1, job id = 1: sleeping...: 17
worker 1, job id = 1: sleeping...: 18
worker 1, job id = 1: sleeping...: 19
worker 1, job id = 1: sleeping...: 20
worker 1, job id = 1: sleeping...: 21
worker 1, job id = 1: sleeping...: 22
worker 1, job id = 1: sleeping...: 23
worker 1, job id = 1: sleeping...: 24
worker 1, job id = 1: sleeping...: 25
worker 1, job id = 1: sleeping...: 26
worker 1, job id = 1: sleeping...: 27
worker 1, job id = 1: sleeping...: 28
worker 1, job id = 1: sleeping...: 29
worker 1, job id = 1: sleeping...: 30
worker 1, job id = 1: sleeping...: 31
worker 1, job id = 1: sleeping...: 32
worker 1, job id = 1: sleeping...: 33
worker 1, job id = 1: sleeping...: 34
worker 1, job id = 1: sleeping...: 35
worker 1, job id = 1: sleeping...: 36
worker 1, job id = 1: sleeping...: 37
worker 1, job id = 1: sleeping...: 38
worker 1, job id = 1: sleeping...: 39
worker 1, job id = 1: sleeping...: 40
worker 1, job id = 1: sleeping...: 41
worker 1, job id = 1: sleeping...: 42
worker 1, job id = 1: sleeping...: 43
worker 1, job id = 1: sleeping...: 44
worker 1, job id = 1: sleeping...: 45
worker 1, job id = 1: sleeping...: 46
worker 1, job id = 1: sleeping...: 47
worker 1, job id = 1: sleeping...: 48
worker 1, job id = 1: sleeping...: 49
worker 1, job id = 1: sleeping...: 50
worker 1, job id = 1: sleeping...: 51
worker 1, job id = 1: sleeping...: 52
worker 1, job id = 1: sleeping...: 53
worker 1, job id = 1: sleeping...: 54
worker 1, job id = 1: sleeping...: 55
worker 1, job id = 1: sleeping...: 56
worker 1, job id = 1: sleeping...: 57
worker 1, job id = 1: sleeping...: 58
worker 1, job id = 1: sleeping...: 59
worker 1, job id = 1: sleeping...: 60
worker 1, job id = 1: sleeping...: 61
worker 1, job id = 1: sleeping...: 62
worker 1, job id = 1: sleeping...: 63
worker 1, job id = 1: sleeping...: 64
worker 1, job id = 1: sleeping...: 65
worker 1, job id = 1: sleeping...: 66
worker 1, job id = 1: sleeping...: 67
worker 1, job id = 1: sleeping...: 68
worker 1, job id = 1: sleeping...: 69
worker 1, job id = 1: sleeping...: 70
worker 1, job id = 1: sleeping...: 71
worker 1, job id = 1: sleeping...: 72
worker 1, job id = 1: sleeping...: 73
worker 1, job id = 1: sleeping...: 74
worker 1, job id = 1: sleeping...: 75
worker 1, job id = 1: sleeping...: 76
worker 1, job id = 1: sleeping...: 77
worker 1, job id = 1: sleeping...: 78
worker 1, job id = 1: sleeping...: 79
worker 1, job id = 1: sleeping...: 80
worker 1, job id = 1: sleeping...: 81
worker 1, job id = 1: sleeping...: 82
worker 1, job id = 1: sleeping...: 83
worker 1, job id = 1: sleeping...: 84
worker 1, job id = 1: sleeping...: 85
worker 1, job id = 1: sleeping...: 86
worker 1, job id = 1: sleeping...: 87
worker 1, job id = 1: sleeping...: 88
worker 1, job id = 1: sleeping...: 89
finished sleeping
job 1 has completed...
```

</details>