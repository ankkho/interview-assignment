import { sequelize, Sequelize } from '../src/lib/sequelize';
import user from './user';

const userPurchaseHistory = sequelize.define('userPurchaseHistory', {
  userId: Sequelize.INTEGER,
  dishName: Sequelize.STRING,
  restaurantName: Sequelize.STRING,
  transactionAmount: Sequelize.DECIMAL,
  transactionDate: Sequelize.DATE
});

user.hasMany(userPurchaseHistory);
userPurchaseHistory.belongsTo(user, {
  foreignKey: 'userId'
});

export default userPurchaseHistory;
