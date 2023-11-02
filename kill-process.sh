#!/bin/bash

PID=$(pgrep -af "yarn.js start")

if [ -n "$PID" ]; then
    kill -SIGTERM $PID;
else
    echo "Main process not found.";
fi