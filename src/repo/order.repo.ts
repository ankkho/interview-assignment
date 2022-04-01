import * as crypto from 'crypto';
import { subtract, add } from 'ramda';
import models from '../../models';
import { orderAttributes, orderCreateRespAttribute } from '../interfaces/order';

const { sequelize, order, user, restaurant } = models;

const createNewOrder = async (
  orderAttr: orderAttributes
): Promise<orderCreateRespAttribute> => {
  const { userId, restaurantId, totalAmount } = orderAttr;

  const { cashBalance: userCashBalance } = await user.findByPk(userId, {
    raw: true
  });
  const { cashBalance: restaurantCashBalance } = await restaurant.findByPk(
    restaurantId,
    { raw: true }
  );

  const newUserCashBalance = subtract(userCashBalance, totalAmount);
  const newRestaurantAmount = add(restaurantCashBalance, totalAmount);

  const resp = await sequelize.transaction(function (t: unknown) {
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
          cashBalance: Number(newUserCashBalance).toFixed(2)
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
          cashBalance: Number(newRestaurantAmount).toFixed(2)
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
