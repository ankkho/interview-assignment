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

interface get {
  get: Function;
}

export { GetMenuByPriceAttributes, SearchAttributes, get };
