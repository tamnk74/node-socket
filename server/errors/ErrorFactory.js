import joiErrors from './joi';
import errors from './data';
import ApiError from './ApiError';
import { env } from '../config';

class ErrorFactory {
  getError(code, err = null) {
    const error = errors[code];
    if (error) {
      return new ApiError({
        code,
        ...error,
      });
    }
    // Handle undefined error code
    if (env !== 'production') {
      console.log(env, code);
    }

    return new ApiError({
      ...errors['ERR-0500'],
      code: 'ERR-0500',
      detail: err ? err.message : 'Internal Server Error',
    });
  };

  getJoiErrors(joiErrors = []) {
    if (env === 'development') {
      console.log(env, joiErrors);
    }
    return joiErrors.map((joiError) => {
      const {
        type,
        context: { label: key },
      } = joiError;

      const code = joiErrors[`${key}.${type}`];
      const error = errors[code];
      if (error) {
        return new ApiError({
          code,
          ...error,
        });
      }

      // Handle undefined error
      return new ApiError({
        code: 'ERR-0422',
        ...errors['ERR-0422'],
      });
    });
  };
}

export default ErrorFactory;
