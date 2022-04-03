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
  itemDetails: [ItemDetails];
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
  createdAt: Date;
  status: string;
}

interface NewOrderResponse {
  valid: boolean;
  code?: string;
  message?: string;
  errorCode?: string;
  data?: OrderCreateRespAttribute
}

export {
  NewOrderResponse,
  OrderAttributes,
  OrderCreateRespAttribute,
  CreateNewOrderAttributes,
  ItemDetailsWithQty
};
