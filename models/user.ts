import { sequelize, Sequelize } from '../src/lib/sequelize';

const user = sequelize.define('user', {
  name: Sequelize.STRING,
  cashBalance: Sequelize.DECIMAL
});

export default user;
