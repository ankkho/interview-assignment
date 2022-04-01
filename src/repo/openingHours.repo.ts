import models from '../../models';
import { openingHourAttributes } from '../interfaces/openingHours';
import { dayMapper } from '../utils';
import { get } from '../interfaces/menu';

const { Sequelize, restaurant, openingHour } = models;
const { Op } = Sequelize;

const getRestaurantsBasedOnTime = async (
  openingHourAttributes: openingHourAttributes
): Promise<object[]> => {
  const { limit, incomingDateTime, timeUTC } = openingHourAttributes;
  const day = Object.values(dayMapper)[incomingDateTime.getDay()];

  // list of restauants based on opening hours
  const resp = await openingHour.findAll({
    limit,
    include: [
      {
        model: restaurant,
        as: 'restaurant',
        attributes: ['id', 'name'],
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
