import { searchMenuByPrice, search } from '../repo/menu.repo';
import { GetMenuByPriceAttributes, SearchAttributes } from '../interfaces/menu';

const searchMenuByPriceRange = (getDishes: GetMenuByPriceAttributes) =>
  searchMenuByPrice({ ...getDishes });

const searchMenu = (searchAttr: SearchAttributes) => search({ ...searchAttr });

export { searchMenuByPriceRange, searchMenu };
