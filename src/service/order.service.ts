import { gt, isNil, subtract, add } from 'ramda';
import models from '../../models';
// import { createNewOrder } from '../repo/order.repo';
import { logger } from '../utils';
import { orderAttributes } from '../interfaces/order';
import { ApolloError } from 'apollo-server-express';

const { user, restaurant, menu } = models;

const placeNewOrder = async (orderAttrs: orderAttributes): Promise<unknown> => {
  try {
    const { userId, itemIds, restaurantId } = orderAttrs;
    const userDetails = await user.findByPk(userId, { raw: true });
    const restaurantDetails = await restaurant.findByPk(restaurantId, {
      raw: true
    });

    if (isNil(userDetails)) {
      logger.info('User does not exists', {
        userId
      });

      throw new ApolloError(
        'Sorry, no such user exists!',
        'CAN_NOT_FETCH_BY_ID'
      );
    }

    if (isNil(restaurantDetails)) {
      logger.info('Restaurant does not exists', {
        restaurantId
      });
      return 'Sorry, no such restaurant exists!';
    }

    const itemDetails = await Promise.all(
      itemIds.map((id) => menu.findByPk(id, { raw: true }))
    );

    if (itemDetails.includes(null)) {
      logger.info('Item does not exists', {
        itemIds,
        restaurantId
      });
      return 'Please provide valid item details!';
    }

    return itemDetails;
    //   const { cashBalance } = userDetails;

    // const { cashBalance: userCashBalance } = await user.findByPk(userId, {
    //   raw: true
    // });
    // const { cashBalance: restaurantCashBalance } = await restaurant.findByPk(
    //   restaurantId,
    //   { raw: true }
    // );

    // const newUserCashBalance = subtract(userCashBalance, totalAmount);
    // const newRestaurantAmount = add(restaurantCashBalance, totalAmount);

    // check for item and restautant
    // cal totl amount

    // if (gt(totalAmount, cashBalance)) {
    //   logger.info('User cash balance is not sufficient', {
    //     userId,
    //     cashBalance,
    //     totalAmount
    //   });

    //   return 'Sorry, Insufficient cash balance!';
    // }

    // return createNewOrder({ ...orderAttrs });
  } catch (error) {
    logger.error('Error', error);
    // throw new Error(error)
  }
};

export { placeNewOrder };
