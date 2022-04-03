import { gt, isNil, subtract, add, isEmpty, multiply } from 'ramda';
import { createNewOrder } from '../repo/order.repo';
import { logger } from '../utils';
import { OrderAttributes } from '../interfaces/order';
import { findUserById } from '../repo/user.repo';
import { findRestaurantById } from '../repo/restaurant.repo';
import { findMenuById } from '../repo/menu.repo';

const placeNewOrder = async (orderAttrs: OrderAttributes): Promise<unknown> => {
  try {
    const { userId, itemDetails, restaurantId } = orderAttrs;
    const userDetails = await findUserById(userId);
    const restaurantDetails = await findRestaurantById(restaurantId);

    if (isNil(userDetails)) {
      logger.info(
        {
          userId
        },
        'User does not exists'
      );

      return {
        valid: false,
        message: 'Sorry, no such user exists!'
      };
    }

    if (isNil(restaurantDetails)) {
      logger.info(
        {
          restaurantId
        },
        'Restaurant does not exists'
      );

      return {
        valid: false,
        message: 'Sorry, no such restaurant exists!'
      };
    }

    const menuDetails = await Promise.all(
      itemDetails.map(async (val) => {
        const { id } = val;
        return await findMenuById(id, restaurantId);
      })
    );

    if (isEmpty(menuDetails.flat())) {
      logger.info(
        {
          itemDetails,
          restaurantId
        },
        'Item does not exists'
      );

      return {
        valid: false,
        message:
          'Please provide valid menu item ids which belongs to this restaurant!'
      };
    }

    const menuDetailsWithQty = menuDetails.flat().map((details) => {
      const { qty } = itemDetails.filter((val) => val.id === details.id)[0];

      return {
        ...details,
        qty
      };
    });

    const totalAmount = menuDetailsWithQty.map((details) => {
      const { price, qty } = details;
      return multiply(price, qty);
    })[0];

    const { cashBalance: userCashBalance } = userDetails;
    const { cashBalance: restaurantCashBalance } = restaurantDetails;

    if (gt(totalAmount, userCashBalance)) {
      logger.info(
        { orderAttrs, totalAmount, userCashBalance },
        'Insufficient Balance'
      );
      return {
        valid: false,
        data: [],
        message: 'Sorry, insufficient balance!'
      };
    }

    const newUserCashBalance = subtract(userCashBalance, totalAmount);
    const newRestaurantAmount = add(restaurantCashBalance, totalAmount);

    const response = await createNewOrder({
      userId,
      restaurantId,
      totalAmount,
      //@ts-ignore,
      items: menuDetailsWithQty,
      //@ts-ignore,
      userCashBalance: newUserCashBalance,
      restaurantCashBalance: newRestaurantAmount
    });

    if (!isNil(response)) {
      return {
        data: response,
        message: 'Order created successfully!'
      };
    }

    return {
      valid: false,
      message: 'Sorry, something went wrong. Order was not placed!'
    };
  } catch (error) {
    logger.error(error, 'Error');
    // throw new Error(error)
  }
};

export { placeNewOrder };
