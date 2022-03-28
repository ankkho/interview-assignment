import restaurant from './restaurant';
import { sequelize, Sequelize } from '../src/lib/sequelize';

const openingHour = sequelize.define('openingHour', {
  restaurantId: Sequelize.INTEGER,
  day: Sequelize.ARRAY(Sequelize.STRING),
  from: Sequelize.DATE,
  to: Sequelize.DATE
});

restaurant.hasMany(openingHour);
openingHour.belongsTo(restaurant, {
  foreignKey: 'restaurantId'
});

export default openingHour;
