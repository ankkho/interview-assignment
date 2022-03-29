interface items {
  dishName: string;
  price: number;
}

interface orderAttributes {
  userId: number;
  restaurantId: number;
  items: [items];
  totalAmount: number;
}

interface orderCreateRespAttribute {
  orderNumber: number;
  transactionId: number;
  createdAt: string;
  status: string;
}

export { orderAttributes, orderCreateRespAttribute };
