import { searchMenuByPrice, search } from '../repo/menu.repo';
import { getMenuByPriceAttributes, searchAttributes } from '../interfaces/menu';

const searchMenuByPriceRange = (getDishes: getMenuByPriceAttributes) =>
  searchMenuByPrice({ ...getDishes });

const searchMenu = (searchAttr: searchAttributes) => search({ ...searchAttr });

export { searchMenuByPriceRange, searchMenu };
