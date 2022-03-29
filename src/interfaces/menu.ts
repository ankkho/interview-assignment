interface getMenuByPriceAttributes {
  minPrice: number;
  maxPrice: number;
  limit?: number;
}
interface searchAttributes {
  query: string;
  limit?: number;
}

interface get {
  get: Function;
}

export { getMenuByPriceAttributes, searchAttributes, get };
