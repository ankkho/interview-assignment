import { searchRestaurant } from '../repo/restaurant.repo';
import { searchAttributes } from '../interfaces/restaurant';

const getRestaurantByName = (searchAttr: searchAttributes) =>
  searchRestaurant({ ...searchAttr });

export { getRestaurantByName };
