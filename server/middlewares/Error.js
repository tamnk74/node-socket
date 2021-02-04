import HttpStatus from 'http-status';
import APIError from '../errors/ApiError';
import { env } from '../config';

class Error {
  handler = (err, req, res) => {
    const response = {
      code: err.status,
      message: err.message || HttpStatus[err.status],
      errors: err.errors,
      stack: err.stack,
    };

    if (env !== 'development') {
      delete response.stack;
    }
    return res.status(err.status).json(response);
  };

  converter = (err, req, res) => {
    let convertedError = err;
    if (!(err instanceof APIError)) {
      convertedError = new APIError({
        message: err.message,
        status: err.status,
        stack: err.stack,
      });
    }

    return this.handler(convertedError, req, res);
  };

  notFound = (req, res) => {
    const err = new APIError({
      message: 'Not found',
      status: HttpStatus.NOT_FOUND,
    });
    return this.handler(err, req, res);
  };
}

export default Error;
