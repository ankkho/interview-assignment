import { getRestaurantsBasedOnTime } from '../repo/openingHours.repo';
import { getRestaurantsAttr } from '../interfaces/openingHours';

const getRestaurantsByTime = (getRestaurantsAttr: getRestaurantsAttr) => {
  const { time } = getRestaurantsAttr;
  return getRestaurantsBasedOnTime({ time });
};

export { getRestaurantsByTime };
