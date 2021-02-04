import user from './user.json';
import event from './event.json';
import common from './common.json';
import post from './post.json';

export default {
  ...common,
  ...user,
  ...event,
  ...post,
};
