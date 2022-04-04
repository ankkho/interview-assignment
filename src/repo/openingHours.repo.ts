import models from '../../models';
import { OpeningHourAttributes } from '../interfaces/openingHours.interface';
import { get } from '../interfaces/menu.interface';

const { Sequelize, restaurant, openingHour } = models;
const { Op } = Sequelize;

const getRestaurantsBasedOnTime = async (
  openingHourAttributes: OpeningHourAttributes
): Promise<object[]> => {
  const { limit, offset, day, timeUTC } = openingHourAttributes;

  // list of restauants based on opening hours
  const resp = await openingHour.findAll({
    limit,
    offset,
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: restaurant,
        as: 'restaurant',
        attributes: {
          include: ['id', 'name'],
          exclude: ['createdAt', 'updatedAt']
        },
        order: [['name', 'ASC']]
      }
    ],
    where: {
      [Op.and]: [
        {
          day: [day]
        },
        {
          from: {
            [Op.gte]: timeUTC
          }
        },
        {
          to: {
            [Op.lte]: timeUTC
          }
        }
      ]
    }
  });

  return resp.map((v: get) => v.get({ plain: true }));
};

export { getRestaurantsBasedOnTime };
