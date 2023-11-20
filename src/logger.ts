import pino from 'pino';

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
// https://github.com/pinojs/pino/blob/master/docs/help.md#stackdriver
const PinoLevelToSeverityLookup = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

export const requestIdLogLabel = 'traceId';

export const logger = pino({
  base: undefined,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  messageKey: 'message',
  errorKey: 'error',
  formatters: {
    messageKey: 'message',
    level(label, number) {
      return {
        severity:
          PinoLevelToSeverityLookup[
            label as keyof typeof PinoLevelToSeverityLookup
          ] || label.toUpperCase(),
        level: number,
      };
    },
  },
});
