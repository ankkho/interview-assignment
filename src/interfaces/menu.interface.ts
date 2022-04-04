interface GetMenuByPriceAttributes {
  minPrice: number;
  maxPrice: number;
  limit: number;
  offset: number;
}
interface SearchAttributes {
  query: string;
  offset: number;
  limit: number;
}

interface MenuDetails {
  dishName: string;
  id: number;
  price: number;
  restaurantId: number;
}

interface get {
  get: Function;
}

export { GetMenuByPriceAttributes, SearchAttributes, get, MenuDetails };
