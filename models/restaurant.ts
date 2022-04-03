import { sequelize, Sequelize } from '../src/lib/sequelize';

const restaurant = sequelize.define('restaurant', {
  name: Sequelize.STRING,
  cashBalance: Sequelize.FLOAT
});

export default restaurant;
