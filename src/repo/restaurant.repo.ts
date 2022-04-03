import models from '../../models';
import {
  getByTimeAttributes,
  searchAttributes
} from '../interfaces/restaurant';

const { Sequelize, restaurant } = models;

const { Op } = Sequelize;

const searchRestaurant = (
  searchAttributes: searchAttributes
): Promise<object> => {
  const { query, limit } = searchAttributes;

  return restaurant.findAll({
    limit,
    order: [['name', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      name: { [Op.iLike]: `${query}%` }
    },
    raw: true
  });
};

const getByTime = (
  getByTimeAttributes: getByTimeAttributes
): Promise<object> => {
  const { startTime, endTime, limit } = getByTimeAttributes;

  return restaurant.findAll({
    limit,
    order: [['name', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      price: {
        [Op.gte]: startTime,
        [Op.lte]: endTime
      }
    },
    raw: true
  });
};

const findRestaurantById = (id: number) =>
  restaurant.findByPk(id, {
    raw: true
  });

export { searchRestaurant, getByTime, findRestaurantById };