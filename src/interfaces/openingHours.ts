interface openingHourAttributes {
  day: string;
  timeUTC: number;
  limit?: number;
}

interface getRestaurantsByTimeAttr {
  dateTime: number;
  offset: number;
  limit: number;
}

export { openingHourAttributes, getRestaurantsByTimeAttr };
