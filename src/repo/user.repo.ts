import models from '../../models';

const { user } = models;

const findUserById = (id: number) =>
  user.findByPk(id, {
    raw: true
  });

export { findUserById };
