import models from '../../models';
import { UserDetails } from '../interfaces/user.interface';

const { user } = models;

const findUserById = (id: number): Promise<UserDetails> =>
  user.findByPk(id, {
    raw: true
  });

export { findUserById };
