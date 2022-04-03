import { placeNewOrder } from '../service/order.service';
import { OrderAttributes } from '../interfaces/order';

//@ts-ignore
const newOrderMutation = async (
  val: unknown,
  args: { newOrderParams: OrderAttributes }
) => {
  const { newOrderParams } = args;
  return placeNewOrder({ ...newOrderParams });
};

export { newOrderMutation };
