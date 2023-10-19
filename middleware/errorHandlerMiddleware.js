import { StatusCodes } from 'http-status-codes';

//this middleware will handle all the errors in the app.
//its function is to send a response with the error message and the status code rather than crashing the app or sending a response with a generic message
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrong, try again later';
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
