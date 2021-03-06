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
  itemDetails: ItemDetails[];
}

interface CreateNewOrderAttributes {
  userCashBalance: number;
  restaurantCashBalance: number;
  userId: number;
  totalAmount: number;
  restaurantId: number;
  items: ItemDetailsWithQty[];
}

interface OrderCreateRespAttribute {
  orderNumber: string;
  transactionId: string;
  createdAt: Date;
  status: string;
}

interface NewOrderResponse {
  valid: boolean;
  code?: string;
  message?: string;
  errorCode?: string;
  data?: OrderCreateRespAttribute;
}

export {
  NewOrderResponse,
  OrderAttributes,
  OrderCreateRespAttribute,
  CreateNewOrderAttributes,
  ItemDetailsWithQty
};
