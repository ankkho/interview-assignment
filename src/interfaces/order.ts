interface itemDetails {
  id: number;
  qty: number;
}

interface itemDetailsWithQty extends itemDetails {
  dishName: string;
  restaurantId: number;
  price: number;
}

interface orderAttributes {
  userId: number;
  restaurantId: number;
  itemDetails: [itemDetails];
}

interface createNewOrderAttributes {
  userCashBalance: number;
  restaurantCashBalance: number;
  userId: number;
  restaurantId: number;
  items: [itemDetailsWithQty];
}

interface orderCreateRespAttribute {
  orderNumber: number;
  transactionId: number;
  createdAt: string;
  status: string;
}

export {
  orderAttributes,
  orderCreateRespAttribute,
  createNewOrderAttributes,
  itemDetailsWithQty
};
