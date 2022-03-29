import { gt } from 'ramda';
import models from '../../models';
import { createNewOrder } from '../repo/order.repo';
import { logger } from '../utils';
import { orderAttributes } from '../interfaces/order';

const { user } = models;

const placeNewOrder = async (orderAttrs: orderAttributes) => {
  const { userId, totalAmount } = orderAttrs;
  const { cashBalance } = await user.findByPk(userId, { raw: true });

  if (gt(totalAmount, cashBalance)) {
    logger.info('User cash balance is not sufficient', {
      userId,
      cashBalance,
      totalAmount
    });

    return 'Sorry, Insufficient cash balance!';
  }

  return createNewOrder({ ...orderAttrs });
};

export { placeNewOrder };
