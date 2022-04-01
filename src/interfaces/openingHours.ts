interface openingHourAttributes {
  incomingDateTime: {
    getHours: Function;
    getDay: Function;
    getMinutes: Function;
  };
  timeUTC: number;
  limit?: number;
}

interface getRestaurantsByTimeAttr {
  time: any;
  limit?: number;
}

export { openingHourAttributes, getRestaurantsByTimeAttr };
