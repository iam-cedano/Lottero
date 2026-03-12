export default class MessageException extends Error {
  constructor(message: string) {
    super(`Invalid message format: ${message}`);
  }
}
