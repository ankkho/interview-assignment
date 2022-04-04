import models from '../../models';
import {
  GetByTimeAttributes,
  SearchAttributes
} from '../interfaces/restaurant.interface';

const { Sequelize, restaurant } = models;

const { Op } = Sequelize;

const searchRestaurant = (
  SearchAttributes: SearchAttributes
): Promise<object> => {
  const { query, limit, offset } = SearchAttributes;

  return restaurant.findAll({
    limit,
    offset,
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
  GetByTimeAttributes: GetByTimeAttributes
): Promise<object> => {
  const { startTime, endTime, limit, offset } = GetByTimeAttributes;

  return restaurant.findAll({
    limit,
    offset,
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
