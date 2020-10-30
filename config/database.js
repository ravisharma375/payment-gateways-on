const { Sequelize } = require("sequelize");
const { config } = require("./index");
const productModel = require("../model/product");
const sequelize = new Sequelize(
  config.get("DATABASE_NAME"),
  config.get("DATABASE_USERNAME"),
  config.get("DATABASE_PASSWORD"),
  {
    host: config.get("DATABASE_HOST"),
    port: config.get("DATABASE_PORT"),
    dialect: config.get("DATABASE_DIALECT"),
    logging: console.log,
    sync: false,
    //India TimeZone Change
    // timezone: "Asia/Calcutta",
    // dialectOptions: {
    //   useUTC: false,
    //   // timezone: "local",
    // },
    pool: {
      max: config.get("DATABASE_POOL_MAX"),
      min: config.get("DATABASE_POOL_MIN"),
      idle: config.get("DATABASE_POOL_IDLE"),
    },
  },
);
const Products = productModel(sequelize, Sequelize);

if (process.env.NODE_ENV === "development") {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Sequelize running in sync mode");
    })
    .catch(error => {
      throw error;
    });
} else {
  // Temporary. Use migrations in production
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Sequelize running in alter mode");
    })
    .catch(error => {
      throw error;
    });
}

const shutdownDatabase = () => {
  sequelize.close();
};

module.exports = {
  shutdownDatabase,
  config,
  sequelize,
  Products,
};
