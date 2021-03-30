import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { errorFactory } from '../errors';
import redis from '../services/Redis';
import { authPrefix } from '../config';
import { status } from '../constants';

export const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, jwtPayload) => {
    if (err) {
      console.error(err);
      return next(errorFactory.getError('ERR-0401'));
    }
    const { user } = jwtPayload;
    if (!user) {
      return next(errorFactory.getError('ERR-0401'));
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const isValidToken = await redis.hexists(`${authPrefix}:${user.id}`, token);
    if (!isValidToken) {
      return next(errorFactory.getError('ERR-0401'));
    }

    if (user.status === status.INACTIVE) {
      return next(errorFactory.getError('USER-0001'));
    }

    req.user = user;
    next();
  })(req, res);
};
