import { sequelize, Sequelize } from '../src/lib/sequelize';

const user = sequelize.define('user', {
  name: Sequelize.STRING,
  cashBalance: Sequelize.FLOAT
});

export default user;
