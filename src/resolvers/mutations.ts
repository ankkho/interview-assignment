import { placeNewOrder } from '../service/order.service';
import { OrderAttributes } from '../interfaces/order';
import { ApolloError } from 'apollo-server';
import { errorType, getErrorMessage } from '../errors';

//@ts-ignore
const newOrderMutation = async (
  val: unknown,
  args: { newOrderParams: OrderAttributes }
) => {
  const { newOrderParams } = args;
  const {valid, ...others} = await placeNewOrder({ ...newOrderParams })  

  if (!valid) {
    const{
      errorCode,
    } = others

    const errorDetails = getErrorMessage(errorCode || '');
    
    const {
      message
    } = errorDetails;

    throw new ApolloError(message, errorCode, errorDetails);
  }
  
};

export { newOrderMutation };
