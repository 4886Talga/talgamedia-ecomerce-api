const { Prisma } = require("@prisma/client");
const { ErrorResponse } = require("../utils/errorResponse");

const handlePrismaError = (error) => {
  switch (error.code) {
    case "P2002":
      // handling duplicate key errors
      return new ErrorResponse(
        `Only one review for this product can be created with this user`,
        400
      );
    case "P2014":
      // handling invalid id errors
      return new ErrorResponse(`Invalid ID`, 400);
    case "P2003":
      // handling invalid data errors
      return new ErrorResponse(`Invalid input data: ${error.meta.target}`, 400);
    default:
      // handling all other errors
      return new ErrorResponse(`Something went wrong: ${error.message}`, 500);
  }
};

const handleJWTError = () =>
  new ErrorResponse("Invalid token please login again", 400);

const handleJWTExpiredError = () =>
  new ErrorResponse("Token has expired please login again", 400);

module.exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //default status code for an error
  err.status = err.status || "error"; //default status

  let error = { ...err };

  error.message = err.message;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("handlePrismaError");
    error = handlePrismaError(err);
  } else if (error.name === "JsonWebTokenError") {
    error = handleJWTError();
  } else if (error.name === "TokenExpiredError") {
    error = handleJWTExpiredError();
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports.handleUnknownRoute = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
};

module.exports.handleError = (error, req, res, next) => {
  let statusCode = 500;
  if (error instanceof ErrorResponse) {
    statusCode = error.getCode();
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};
