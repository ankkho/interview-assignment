import { searchRestaurant } from '../repo/restaurant.repo';
import { SearchAttributes } from '../interfaces/restaurant.interface';

const getRestaurantByName = (searchAttr: SearchAttributes) =>
  searchRestaurant({ ...searchAttr });

export { getRestaurantByName };
