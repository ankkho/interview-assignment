import { placeNewOrder } from '../service/order.service';
import { orderAttributes } from '../interfaces/order';

//@ts-ignore
const newOrderMutation = async (
  val: unknown,
  args: { newOrderParams: orderAttributes }
) => {
  const { newOrderParams } = args;
  return placeNewOrder({ ...newOrderParams });
};

export { newOrderMutation };
