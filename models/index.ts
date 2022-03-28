import { sequelize, Sequelize } from '../src/lib/sequelize';
import restaurant from './restaurant';
import menu from './menu';
import user from './user';
import userPurchaseHistory from './userpurchasehistory';
import openingHour from './openinghour';
import order from './order';

const models = {
  sequelize,
  Sequelize,
  restaurant,
  menu,
  user,
  openingHour,
  userPurchaseHistory,
  order
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

export default models;
