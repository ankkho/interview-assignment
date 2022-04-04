import { getRestaurantsByTime } from '../service/openingHours.service';
import { searchMenuByPriceRange, searchMenu } from '../service/menu.service';
import { getRestaurantByName } from '../service/restaurant.service';

import { GetRestaurantsByTimeAttr } from '../interfaces/openingHours.interface';
import {
  GetMenuByPriceAttributes,
  SearchAttributes
} from '../interfaces/menu.interface';

const getRestaurantsQuery = async (
  parent: {},
  args: GetRestaurantsByTimeAttr,
  context: unknown,
  info: unknown
) => {
  return getRestaurantsByTime({ ...args });
};

const searchMenuByPriceRangeQuery = async (
  parent: unknown,
  args: GetMenuByPriceAttributes,
  context: unknown,
  info: unknown
) => searchMenuByPriceRange({ ...args });

const searchRestaurantQuery = async (
  parent: unknown,
  args: SearchAttributes,
  context: unknown,
  info: unknown
) => getRestaurantByName({ ...args });

const searchMenuQuery = async (
  parent: unknown,
  args: SearchAttributes,
  context: unknown,
  info: unknown
) => searchMenu({ ...args });

const pingQuery = async () => 'pong';

export {
  pingQuery,
  searchRestaurantQuery,
  searchMenuQuery,
  getRestaurantsQuery,
  searchMenuByPriceRangeQuery
};
