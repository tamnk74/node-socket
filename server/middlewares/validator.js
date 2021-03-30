import { errorFactory } from '../errors';

export const validator = (schema, type = 'body') => (req, res, next) => {
  const body = req[type];
  const { error } = schema.validate(body);
  if (error == null) {
    return next();
  }

  return next(errorFactory.getJoiErrors(error.details));
};
