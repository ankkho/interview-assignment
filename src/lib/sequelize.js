const Sequelize = require('sequelize')
require('pg').defaults.parseInt8 = true;

const sequelize = new Sequelize('db', 'user', 'password', {
	// the sql dialect of the database
	// currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
	dialect: 'postgres',

	// custom host; default: localhost
	host: process.env.NODE_ENV === 'development' ? '127.0.0.1' : process.env.DB_HOST,

	// custom port; default: dialect default
	port: 5432,

	// custom protocol; default: 'tcp'
	// postgres only, useful for Heroku
	protocol: null,

	// you can also pass any dialect options to the underlying dialect library
	// - default is empty
	// - currently supported: 'mysql', 'postgres', 'mssql'
	dialectOptions: {
		supportBigNumbers: true,
		bigNumberStrings: true
	},

	// the storage engine for sqlite
	// - default ':memory:'
	storage: 'path/to/database.sqlite',

	// disable inserting undefined values as NULL
	// - default: false
	omitNull: true,

	// a flag for using a native library or not.
	// in the case of 'pg' -- set this to true will allow SSL support
	// - default: false
	native: true,

	// Specify options, which are used when sequelize.define is called.
	// The following example:
	//   define: { timestamps: false }
	// is basically the same as:
	//   sequelize.define(name, attributes, { timestamps: false })
	// so defining the timestamps for each model will be not necessary
	define: {
		underscored: false,
		freezeTableName: false,
		charset: 'utf8',
		dialectOptions: {
			collate: 'utf8_general_ci',
			ssl: process.env.NODE_ENV !== 'dev' ? 'Amazon RDS' : ''
		},
		timestamps: true
	},

	// similar for sync: you can define this to always force sync for models
	sync: { force: true },

	// pool configuration used to pool database connections
	pool: {
		max: 5,
		min: 0,
		idle: 30000,
		acquire: 600000
	}
});

module.exports = { sequelize, Sequelize };
