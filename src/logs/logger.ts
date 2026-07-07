export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const PREFIX = '[RuyiBigScreen]'

function emit(level: LogLevel, ...args: unknown[]) {
  const msg = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
  // eslint-disable-next-line no-console
  console[level === 'debug' ? 'log' : level](`${PREFIX} ${msg}`)
}

export const log = {
  debug: (...args: unknown[]) => emit('debug', ...args),
  info: (...args: unknown[]) => emit('info', ...args),
  warn: (...args: unknown[]) => emit('warn', ...args),
  error: (...args: unknown[]) => emit('error', ...args),
}
