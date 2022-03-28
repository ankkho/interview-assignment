import axios from 'axios';
import models from '../models';
import { dayMapper } from '../src/utils';

const { userPurchaseHistory, user, restaurant, openingHour, menu } = models;

interface purchaseHistoryAttr {
  dishName: string;
  restaurantName: string;
  transactionAmount: number;
  transactionDate: string;
}

const restaurantMenuData =
  'https://gist.githubusercontent.com/seahyc/b9ebbe264f8633a1bf167cc6a90d4b57/raw/021d2e0d2c56217bad524119d1c31419b2938505/restaurant_with_menu.json';
const userData =
  'https://gist.githubusercontent.com/seahyc/de33162db680c3d595e955752178d57d/raw/785007bc91c543f847b87d705499e86e16961379/users_with_purchase_history.json';

const replaceAt = (string: string): string => {
  const index =
    string.indexOf('a') === -1 ? string.indexOf('p') : string.indexOf('a');
  if (string.includes(':')) return string;
  return `${string.substr(0, index).trim()}:00 ${string.substr(index)}`;
};

const getTwentyFourHourTime = (amPmString: string) => {
  let d = new Date('1/1/2013 ' + amPmString);
  return d.getHours() + ':' + d.getMinutes();
};

const seedRestaurantData = async () => {
  const { data } = await axios.get(restaurantMenuData);

  data.forEach(async (element: any) => {
    const {
      restaurantName,
      cashBalance,
      menu: menuDetails,
      openingHours
    } = element;
    const { id } = await restaurant.create(
      { name: restaurantName, cashBalance, menus: menuDetails },
      {
        include: [menu]
      }
    );

    // @ts-ignore
    openingHours.split('/').forEach((details) => {
      const data = details.split(/(\d+)/);

      // @ts-ignore
      data.forEach(async (content) => {
        const contentValue = content.includes(',')
          ? content.split(',')
          : [content];

        // @ts-ignore
        const allDays = contentValue
          .filter((d) => Object.keys(dayMapper).includes(d.trim()))
          .map((v) => v.trim())
          .map((v) => dayMapper[v]);
        delete data[0];

        if (allDays.length) {
          // @ts-ignore
          const time = data
            .filter((v) => !!v)
            .join('')
            .split('-');

          const openTime = getTwentyFourHourTime(replaceAt(time[0]));
          const closeTime = getTwentyFourHourTime(replaceAt(time[1]));

          await openingHour.create({
            // @ts-ignore
            day: allDays,
            from: new Date(`01-3-2022 ${openTime} UTC`).getTime(),
            to: new Date(`01-3-2022 ${closeTime} UTC`).getTime(),
            restaurantId: id
          });
        }
      });
    });
  });
};

const seedUserData = async () => {
  const { data } = await axios.get(userData);

  data.forEach(async (element: any) => {
    const { name, cashBalance, purchaseHistory } = element;

    const userPurchaseHistories = purchaseHistory.map(
      (val: purchaseHistoryAttr) => {
        const { transactionDate, ...others } = val;
        return {
          ...others,
          transactionDate: new Date(`${transactionDate} UTC`)
        };
      }
    );

    await user.create(
      {
        name,
        cashBalance,
        userPurchaseHistories
      },
      {
        include: [userPurchaseHistory]
      }
    );
  });
};

(async () => {
  await Promise.all([seedRestaurantData(), seedUserData()]);
})();
