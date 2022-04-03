import restaurant from './restaurant';
import { sequelize, Sequelize } from '../src/lib/sequelize';

const menu = sequelize.define('menu', {
  dishName: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  restaurantId: Sequelize.INTEGER
});

restaurant.hasMany(menu);
menu.belongsTo(restaurant, {
  foreignKey: 'restaurantId'
});

export default menu;
