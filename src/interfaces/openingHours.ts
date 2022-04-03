interface OpeningHourAttributes {
  day: string;
  timeUTC: number;
  limit: number;
  offset: number;
}

interface GetRestaurantsByTimeAttr {
  dateTime: number;
  offset: number;
  limit: number;
}

export { OpeningHourAttributes, GetRestaurantsByTimeAttr };
