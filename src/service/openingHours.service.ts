import { getRestaurantsBasedOnTime } from '../repo/openingHours.repo';
import { GetRestaurantsByTimeAttr } from '../interfaces/openingHours';
import { dayMapper, logger } from '../utils';

const getRestaurantsByTime = async (
  getRestaurantsByTimeAttr: GetRestaurantsByTimeAttr
) => {
  try {
    const { dateTime, limit, offset } = getRestaurantsByTimeAttr;

    const incomingDateTime = new Date(dateTime);

    const queryTime = `${incomingDateTime.getHours()}:${incomingDateTime.getMinutes()}`;
    const timeUTC = new Date(`01-3-2022 ${queryTime} UTC`).getTime();
    const day = Object.values(dayMapper)[incomingDateTime.getDay()];

    logger.info({
      limit,
      day,
      timeUTC
    });

    const restauants = await getRestaurantsBasedOnTime({
      limit,
      day,
      timeUTC,
      offset
    });

    return restauants.map((va: any) => {
      const { from, to, ...others } = va;

      return {
        ...others,
        from: new Date(from).toLocaleTimeString('en-GB', { timeZone: 'UTC' }),
        to: new Date(to).toLocaleTimeString('en-GB', { timeZone: 'UTC' })
      };
    });
  } catch (error) {
    logger.error('Error', error);
  }
};

export { getRestaurantsByTime };
