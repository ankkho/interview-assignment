interface getByTimeAttributes {
  startTime: string;
  endTime: string;
  limit: number;
}

interface searchAttributes {
  query: string;
  limit?: number;
}

export { getByTimeAttributes, searchAttributes };
