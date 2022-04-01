import { getRestaurantsByTime } from '../service/openingHours.service';
import { searchMenuByPriceRange, searchMenu } from '../service/menu.service';
import { getRestaurantByName } from '../service/restaurant.service';

import { getRestaurantsByTimeAttr } from '../interfaces/openingHours';
import { getMenuByPriceAttributes, searchAttributes } from '../interfaces/menu';

const getRestaurantsQuery = async (
  parent: {},
  args: getRestaurantsByTimeAttr,
  context: unknown,
  info: unknown
) => {
  const { time } = args;
  return getRestaurantsByTime({ time });
};

const searchMenuByPriceRangeQuery = async (
  parent: unknown,
  args: getMenuByPriceAttributes,
  context: unknown,
  info: unknown
) => searchMenuByPriceRange({ ...args });

const searchRestaurantQuery = async (
  parent: unknown,
  args: searchAttributes,
  context: unknown,
  info: unknown
) => getRestaurantByName({ ...args });

const searchMenuQuery = async (
  parent: unknown,
  args: searchAttributes,
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
