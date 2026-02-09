export type LogLevel = "debug" | "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string,
  meta: Record<string, unknown> = {},
): void {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...meta,
  };

  const line = JSON.stringify(entry);

  switch (level) {
    case "error":
      process.stderr.write(`${line}\n`);
      break;
    default:
      process.stdout.write(`${line}\n`);
      break;
  }
}
