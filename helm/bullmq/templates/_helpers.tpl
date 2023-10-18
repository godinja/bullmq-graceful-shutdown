{{/*
Expand the name of the chart.
*/}}
{{- define "bullmq-graceful-shutdown.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "bullmq-graceful-shutdown.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "bullmq-graceful-shutdown.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "bullmq-graceful-shutdown.labels" -}}
helm.sh/chart: {{ include "bullmq-graceful-shutdown.chart" . }}
{{ include "bullmq-graceful-shutdown.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "bullmq-graceful-shutdown.selectorLabels" -}}
app.kubernetes.io/name: {{ include "bullmq-graceful-shutdown.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "bullmq-graceful-shutdown.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "bullmq-graceful-shutdown.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
App envs
*/}}
{{- define "bullmq-graceful-shutdown.envs" -}}
{{- range $key, $val := .Values.env }}
- name: {{ $key | snakecase | upper }}
  value: {{ $val | toString | quote }}
{{- end}}
{{- end }}
