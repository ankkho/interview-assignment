import { getRestaurantsBasedOnTime } from '../repo/openingHours.repo';
import { getRestaurantsByTimeAttr } from '../interfaces/openingHours';

const getRestaurantsByTime = async (
  getRestaurantsByTimeAttr: getRestaurantsByTimeAttr
) => {
  const { time, limit } = getRestaurantsByTimeAttr;

  const incomingDateTime = new Date(time);
  const queryTime = `${incomingDateTime.getHours()}:${incomingDateTime.getMinutes()}`;
  const timeUTC = new Date(`01-3-2022 ${queryTime} UTC`).getTime();

  const restauants = await getRestaurantsBasedOnTime({
    limit,
    incomingDateTime,
    timeUTC
  });

  return restauants.map((va: any) => {
    const { from, to, ...others } = va;

    return {
      ...others,
      from: new Date(from).toLocaleString('en-GB', { timeZone: 'UTC' }),
      to: new Date(to).toLocaleString('en-GB', { timeZone: 'UTC' })
    };
  });
};

export { getRestaurantsByTime };
