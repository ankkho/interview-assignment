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
  const { minPrice, maxPrice, limit } = getDishes;

  const resp = await menu.findAll({
    limit,
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

const search = (searchAttributes: searchAttributes): Promise<object> => {
  const { query, limit } = searchAttributes;

  return menu.findAll({
    limit,
    order: [['dishName', 'ASC']],
    where: {
      dishName: { [Op.iLike]: `${query}%` }
    },
    raw: true
  });
};

export { searchMenuByPrice, search };
