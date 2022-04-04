interface GetByTimeAttributes {
  startTime: string;
  endTime: string;
  limit: number;
  offset: number;
}

interface SearchAttributes {
  query: string;
  limit: number;
  offset: number;
}

export { GetByTimeAttributes, SearchAttributes };
