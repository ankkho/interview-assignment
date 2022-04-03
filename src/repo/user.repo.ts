import models from '../../models';
import { UserDetails } from './user';

const { user } = models;

const findUserById = (id: number): Promise<UserDetails> =>
  user.findByPk(id, {
    raw: true
  });

export { findUserById };
