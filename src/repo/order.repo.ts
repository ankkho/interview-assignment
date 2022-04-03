import * as crypto from 'crypto';
import { isEmpty, multiply } from 'ramda';
import models from '../../models';
import {
  CreateNewOrderAttributes,
  OrderCreateRespAttribute
} from '../interfaces/order';
import { logger } from '../utils';
import { findRestaurantById } from './restaurant.repo';

const { sequelize, order, user, restaurant, userPurchaseHistory } = models;

const createNewOrder = async (
  orderAttr: CreateNewOrderAttributes
): Promise<OrderCreateRespAttribute> => {
  try {
    const {
      userId,
      restaurantId,
      userCashBalance,
      restaurantCashBalance,
      items
    } = orderAttr;

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

    if (!isEmpty(resp)) {
      const done = items.map(async (val) => {
        const { dishName, qty, price } = val;
        const totalAmount = multiply(price, qty);

        const { name } = await findRestaurantById(restaurantId);

        return userPurchaseHistory.create({
          dishName,
          userId,
          totalAmount,
          restaurantName: name,
          transactionDate: new Date()
        });
      });

      const created = await Promise.all(done);
      logger.info(created, 'User purchase history has been created');
    }

    const { orderNumber, transactionId, createdAt, status } =
      resp[0].dataValues;
    return {
      orderNumber,
      transactionId,
      createdAt: new Date(createdAt),
      status
    };
  } catch (error) {
    logger.error(error, 'Error');
    throw new Error();
  }
};

export { createNewOrder };
