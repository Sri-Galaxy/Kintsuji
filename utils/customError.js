export default class customError extends Error {
    constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}