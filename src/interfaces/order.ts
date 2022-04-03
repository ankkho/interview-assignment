interface ItemDetails {
  id: number;
  qty: number;
}

interface ItemDetailsWithQty extends ItemDetails {
  dishName: string;
  restaurantId: number;
  price: number;
}

interface OrderAttributes {
  userId: number;
  restaurantId: number;
  ItemDetails: [ItemDetails];
}

interface CreateNewOrderAttributes {
  userCashBalance: number;
  restaurantCashBalance: number;
  userId: number;
  restaurantId: number;
  items: [ItemDetailsWithQty];
}

interface OrderCreateRespAttribute {
  orderNumber: number;
  transactionId: number;
  createdAt: string;
  status: string;
}

export {
  OrderAttributes,
  OrderCreateRespAttribute,
  CreateNewOrderAttributes,
  ItemDetailsWithQty
};
