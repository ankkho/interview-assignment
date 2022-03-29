import models from '../../models';
import { getRestaurantsAttr } from '../interfaces/openingHours';
import { dayMapper } from '../utils';
import { get } from '../interfaces/menu';

const { Sequelize, restaurant, openingHour } = models;
const { Op } = Sequelize;

const getRestaurantsBasedOnTime = async (
  openingHourAttributes: getRestaurantsAttr
): Promise<object> => {
  const { limit, time } = openingHourAttributes;

  const incomingDateTime = new Date(time);

  const day = Object.values(dayMapper)[incomingDateTime.getDay()];

  const queryTime = `${incomingDateTime.getHours()}:${incomingDateTime.getMinutes()}`;
  const timeUTC = new Date(`01-3-2022 ${queryTime} UTC`).getTime();

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

  return resp
    .map((v: get) => v.get({ plain: true }))
    .map((va: any) => {
      const { from, to, ...others } = va;

      return {
        ...others,
        from: new Date(from).toLocaleString('en-GB', { timeZone: 'UTC' }),
        to: new Date(to).toLocaleString('en-GB', { timeZone: 'UTC' })
      };
    });
};

export { getRestaurantsBasedOnTime };
