import { validator } from '../../../middlewares';
import loginSchema from '../schemas/login';
import refreshTokenSchema from '../schemas/refresh-token';

export const loginValidation = validator(loginSchema);
export const refreshTokenValidation = validator(refreshTokenSchema);
