import { gt, isNil, subtract, add, isEmpty, multiply } from 'ramda';
import { createNewOrder } from '../repo/order.repo';
import { logger } from '../utils';
import { OrderAttributes, NewOrderResponse } from '../interfaces/order';
import { findUserById } from '../repo/user.repo';
import { findRestaurantById } from '../repo/restaurant.repo';
import { findMenuById } from '../repo/menu.repo';
import { errorName } from '../errors';

const {
  INSUFFICIENT_BALANCE,
  USER_NOT_FOUND,
  RESTAURANT_NOT_FOUND,
  ITEM_NOT_FOUND,
  INTERNAL_SERVER_ERROR
} = errorName

const placeNewOrder = async (orderAttrs: OrderAttributes): Promise<NewOrderResponse> => {
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
        errorCode: USER_NOT_FOUND
      }
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
        errorCode: RESTAURANT_NOT_FOUND
      }
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
        errorCode: ITEM_NOT_FOUND
      }
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
        errorCode: INSUFFICIENT_BALANCE
      }
    }

    const newUserCashBalance = subtract(userCashBalance, totalAmount);
    const newRestaurantAmount = add(restaurantCashBalance, totalAmount);

    const response = await createNewOrder({
      userId,
      restaurantId,
      totalAmount,
      //@ts-ignore
      items: menuDetailsWithQty,
      userCashBalance: newUserCashBalance,
      restaurantCashBalance: newRestaurantAmount
    });

    if (!isNil(response)) {
      return {
        valid: true,
        data: response,
        message: 'Order created successfully!'
      };
    }

    return {
      valid: false,
      code: INTERNAL_SERVER_ERROR
    }
  } catch (error) {
    logger.error(error, 'Error');
    return {
      valid: false,
      code: INTERNAL_SERVER_ERROR
    }
  }
};

export { placeNewOrder };
