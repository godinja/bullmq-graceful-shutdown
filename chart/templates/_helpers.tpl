{{/*
App envs
*/}}
{{- define "bullmq-graceful-shutdown.envs" -}}
{{- range $key, $val := .Values.env }}
- name: {{ $key | snakecase | upper }}
  value: {{ $val | toString | quote }}
{{- end}}
{{- end }}
