interface orderAttributes {
  userId: number;
  restaurantId: number;
  itemIds: number[];
}

interface createNewOrderAttributes {
  userCashBalance: number;
  restaurantCashBalance: number;
  userId: number;
  restaurantId: number;
}

interface orderCreateRespAttribute {
  orderNumber: number;
  transactionId: number;
  createdAt: string;
  status: string;
}

export { orderAttributes, orderCreateRespAttribute, createNewOrderAttributes };
