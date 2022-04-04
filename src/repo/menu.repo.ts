import models from '../../models';
import {
  GetMenuByPriceAttributes,
  SearchAttributes,
  get,
  MenuDetails
} from '../interfaces/menu.interface';

const { menu, Sequelize, restaurant } = models;
const { Op } = Sequelize;

const searchMenuByPrice = async (
  getDishes: GetMenuByPriceAttributes
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

const search = (SearchAttributes: SearchAttributes): Array<object> => {
  const { query, limit, offset } = SearchAttributes;

  return menu.findAll({
    limit,
    offset,
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

const findMenuById = (id: number, restaurantId: number): Promise<MenuDetails> =>
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
