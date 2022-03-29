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
    where: {
      price: {
        [Op.gte]: startTime,
        [Op.lte]: endTime
      }
    },
    raw: true
  });
};

export { searchRestaurant, getByTime };
