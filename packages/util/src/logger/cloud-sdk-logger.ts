/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

const DEFAULT_LOGGER__MESSAGE_CONTEXT = '__DEFAULT_LOGGER__MESSAGE_CONTEXT';

const moduleLogger = createLogger({
  package: 'util',
  messageContext: 'cloud-sdk-logger'
});

const ConsoleLogger = {
  // eslint-disable-next-line no-console
  warn: console.warn.bind(console),
  // eslint-disable-next-line no-console
  log: console.log.bind(console),
  // eslint-disable-next-line no-console
  error: console.error.bind(console),
  // eslint-disable-next-line no-console
  debug: console.debug.bind(console),
  // eslint-disable-next-line no-console
  info: console.info.bind(console),
  // eslint-disable-next-line no-console
  verbose: console.info.bind(console)
} as any;

function toggleMuteLoggers(_silence: boolean) {}

function toggleSilenceTransports(logger: any, silence: boolean) {
  logger.transports.forEach(transport => (transport.silent = silence));
}

/**
 * Mute all logger output created by the SAP Cloud SDK Logger. This also applies to future loggers created. Useful for tests.
 */
export function muteLoggers(): void {
  toggleMuteLoggers(true);
}

/**
 * Unmute all logger output created by the SAP Cloud SDK Logger. This also applies to future loggers created. Useful for tests.
 */
export function unmuteLoggers(): void {
  toggleMuteLoggers(false);
}

/**
 * Default logger for the SAP Cloud SDK for unhandled exceptions.
 */
export const cloudSdkExceptionLogger = ConsoleLogger;

/**
 * Disable logging of exceptions. Enabled by default.
 */
export function disableExceptionLogger(): void {
  cloudSdkExceptionLogger.exceptions.unhandle();
}

/**
 * Enable logging of exceptions. Enabled by default.
 */
export function enableExceptionLogger(): void {}

/**
 * Create a logger for the given message context, if available.
 *
 * Usage:
 * To create a logger in your module, it is recommended to pass a module identifier that will be logged as `messageContext` for all messages from this logger:
 * `const logger = createLogger('my-module');`. Not setting any module identifier will retrieve the default logger.
 * Use this logger throughout your module. If the module is spread over multiple files, you can retrieve the logger instance by calling the `createLogger` function with the respective module identifier.
 * There will always be only one instance of a logger per module identifier.
 * You can pass any custom data that you want to be logged in addition by passing an object instead. You can change the default logging level (`INFO`) using the `level` key in the object.
 * In those cases, provide the `messageContext` as a key in the object:
 * ```
 * const logger = createLogger({
 *   messageContext: 'my-module',
 *   myCustomKey: 'my-custom-data',
 *   level: 'debug'
 * });
 * ```
 * You will find these information under the _custom_fields_ key in your Cloud Foundry logs.
 *
 * To retrieve a logger after its creation use [[getLogger]].
 * If you want to change the log level of a logger use [[setLogLevel]].
 *
 * @param _messageContext - Either a key for the message context of all messages produced by the logger or an object with additional keys to set in the message.
 * @returns A newly created or an already existing logger for the given context.
 */
export function createLogger(
  _messageContext?: string | (MessageContextObj & LoggerOptions)
): any {
  return ConsoleLogger;
}

/**
 * Get logger for a given message context, if avilable.
 * @param _messageContext - A key for the message context of all messages produced by the logger
 * @returns The logger for the given messageContext if it was created before
 */
export function getLogger(
  _messageContext = DEFAULT_LOGGER__MESSAGE_CONTEXT
): any | undefined {
  return ConsoleLogger;
}

/**
 * Change the log level of a logger based on its message context.
 * E. g., to set the log level for the destination accessor module of the SDK to _debug_, simply call `setLogLevel('debug', 'destination-acessor')`.
 * @param _level - level to set the logger to. Use an empty string '' as level to unset context level.
 * @param _messageContextOrLogger - Message context of the logger to change the log level for or the logger itself
 */
export function setLogLevel(
  _level: LogLevel | '',
  _messageContextOrLogger: string | any = DEFAULT_LOGGER__MESSAGE_CONTEXT
): void {}

/**
 * Change the global log level of the container which will set default level for all active loggers.
 * E. g., to set the global log level call `setGlobalLogLevel('debug')`.
 * @param level: LogLevel
 */
export function setGlobalLogLevel(level: LogLevel): void {}

export function getGlobalLogLevel(): string | undefined {
  return;
}

function getMessageContext(_logger: any): string | undefined {
  return;
}

/**
 * Npm log levels used for the SAP Cloud SDK logger.
 */
export type LogLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'verbose'
  | 'debug'
  | 'silly';

/**
 * Configurable logger options.
 */
export interface LoggerOptions {
  level?: LogLevel;
  logger?: string;
}

/**
 * Log message context for a logger with additional custom data.
 */
export interface MessageContextObj {
  messageContext?: string;
  [key: string]: any;
}
