import user from './user';
import restaurant from './restaurant';
import { sequelize, Sequelize } from '../src/lib/sequelize';

const order = sequelize.define('order', {
  restaurantId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  orderNumber: Sequelize.STRING,
  items: Sequelize.JSONB,
  transactionId: Sequelize.STRING,
  status: Sequelize.ENUM(
    'CREATED',
    'FAILED',
    'PENDING',
    'IN-PRGORESS',
    'COMPLETED'
  ),
  totalAmount: Sequelize.DECIMAL
});

user.hasMany(order);
restaurant.hasMany(order);
order.belongsTo(restaurant, {
  foreignKey: 'restaurantId'
});
order.belongsTo(user, {
  foreignKey: 'userId'
});

export default order;
