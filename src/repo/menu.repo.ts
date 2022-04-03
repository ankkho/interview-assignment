import models from '../../models';
import {
  getMenuByPriceAttributes,
  searchAttributes,
  get
} from '../interfaces/menu';

const { menu, Sequelize, restaurant } = models;
const { Op } = Sequelize;

const searchMenuByPrice = async (
  getDishes: getMenuByPriceAttributes
): Promise<object> => {
  const { minPrice, maxPrice, limit, offset } = getDishes;

  const resp = await menu.findAll({
    limit,
    offset,
    include: [
      {
        model: restaurant,
        as: 'restaurant',
        order: [['name', 'ASC']]
      }
    ],
    order: [['dishName', 'ASC']],
    where: {
      price: {
        [Op.gte]: minPrice,
        [Op.lte]: maxPrice
      }
    }
  });

  return resp.map((v: get) => v.get({ plain: true }));
};

const search = (searchAttributes: searchAttributes): Array<object> => {
  const { query, limit } = searchAttributes;

  return menu.findAll({
    limit,
    order: [['dishName', 'ASC']],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      dishName: { [Op.iLike]: `${query}%` }
    },
    raw: true
  });
};

const findMenuById = (id: number, restaurantId: number) =>
  menu.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    where: {
      id,
      restaurantId
    },
    raw: true
  });

export { searchMenuByPrice, search, findMenuById };