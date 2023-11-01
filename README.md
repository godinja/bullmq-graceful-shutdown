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