import { searchRestaurant } from '../repo/restaurant.repo';
import { SearchAttributes } from '../interfaces/restaurant';

const getRestaurantByName = (searchAttr: SearchAttributes) =>
  searchRestaurant({ ...searchAttr });

export { getRestaurantByName };
