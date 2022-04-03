import models from '../../models';
import { openingHourAttributes } from '../interfaces/openingHours';
import { dayMapper } from '../utils';
import { get } from '../interfaces/menu';

const { Sequelize, restaurant, openingHour } = models;
const { Op } = Sequelize;

const getRestaurantsBasedOnTime = async (
  openingHourAttributes: openingHourAttributes
): Promise<object[]> => {
  const { limit, day, timeUTC } = openingHourAttributes;

  // list of restauants based on opening hours
  const resp = await openingHour.findAll({
    limit,
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
