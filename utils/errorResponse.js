class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// for login only -> not for signup is db error
class Unauthorized extends ErrorResponse {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
  }
  getCode() {
    return 401;
  }
}

// HTTP 409 Conflict -> Duplication
class Conflict extends ErrorResponse {
  constructor(message) {
    super(message);
    this.name = "Conflict";
  }
  getCode() {
    return 409;
  }
}

// 403 Forbidden
class Forbidden extends ErrorResponse {
  constructor(message) {
    super(message);
    this.name = "Forbidden";
  }
  getCode() {
    return 403;
  }
}

class NotFound extends ErrorResponse {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }

  getCode() {
    return 404;
  }
}

class BadRequest extends ErrorResponse {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
  }
  getCode() {
    return 400;
  }
}

module.exports = {
  ErrorResponse,
  Conflict,
  NotFound,
  BadRequest,
  Forbidden,
  Unauthorized,
};
