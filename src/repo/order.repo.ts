import * as crypto from 'crypto';
import models from '../../models';
import {
  createNewOrderAttributes,
  orderCreateRespAttribute
} from '../interfaces/order';

const { sequelize, order, user, restaurant } = models;

const createNewOrder = async (
  orderAttr: createNewOrderAttributes
): Promise<orderCreateRespAttribute> => {
  const { userId, restaurantId, userCashBalance, restaurantCashBalance } =
    orderAttr;

  const resp = await sequelize.transaction(function (t: Function) {
    return Promise.all([
      order.create(
        {
          ...orderAttr,
          orderNumber: crypto.randomBytes(8).toString('hex').toUpperCase(),
          transactionId: crypto.randomBytes(8).toString('hex').toUpperCase(),
          status: 'COMPLETED'
        },
        { transaction: t, raw: true }
      ),
      user.update(
        {
          cashBalance: Number(userCashBalance).toFixed(2)
        },
        {
          where: {
            id: userId
          },
          transaction: t
        }
      ),
      restaurant.update(
        {
          cashBalance: Number(restaurantCashBalance).toFixed(2)
        },
        {
          where: {
            id: restaurantId
          },
          transaction: t
        }
      )
    ]);
  });

  const { orderNumber, transactionId, createdAt, status } = resp[0].dataValues;
  return {
    orderNumber,
    transactionId,
    createdAt: new Date(createdAt).toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status
  };
};

export { createNewOrder };