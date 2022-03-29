import { searchMenuByPriceRange, searchMenu } from '../service/menu.service';
import { getMenuByPriceAttributes, searchAttributes } from '../interfaces/menu';

const searchMenuByPriceRangeQuery = async (
  parent: unknown,
  args: getMenuByPriceAttributes,
  context: unknown,
  info: unknown
) => searchMenuByPriceRange({ ...args });

const searchMenuQuery = async (
  parent: unknown,
  args: searchAttributes,
  context: unknown,
  info: unknown
) => searchMenu({ ...args });

const pingQuery = async () => 'pong';

export {
  pingQuery,
  searchMenuQuery,
  searchMenuByPriceRangeQuery
};
