const Convict = require("convict");

const config = new Convict({
  HOST: {
    doc: "Host",
    format: String,
    default: "0.0.0.0",
    env: "HOST",
  },
  PORT: {
    doc: "Port",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  DATABASE_NAME: {
    doc: "Database name",
    format: String,
    default: "offer-shoffer-api",
    env: "DATABASE_NAME",
  },
  DATABASE_USERNAME: {
    doc: "Database name",
    format: String,
    default: "offer-shoffer",
    env: "DATABASE_USERNAME",
  },
  DATABASE_PASSWORD: {
    doc: "Database name",
    format: String,
    default: "docker",
    env: "DATABASE_PASSWORD",
  },
  DATABASE_HOST: {
    doc: "Database host",
    format: String,
    default: "0.0.0.0",
    env: "DATABASE_HOST",
  },
  DATABASE_PORT: {
    doc: "Database host",
    format: "port",
    default: 5432,
    env: "DATABASE_PORT",
  },
  DATABASE_DIALECT: {
    doc: "Database type",
    format: String,
    default: "mysql",
    env: "DATABASE_DIALECT",
  },
  DATABASE_POOL_MAX: {
    doc: "Maximum number of connection in pool",
    format: Number,
    default: 5,
    env: "DATABASE_POOL_MAX",
  },
  DATABASE_POOL_MIN: {
    doc: "Minimum number of connection in pool",
    format: Number,
    default: 0,
    env: "DATABASE_POOL_MIN",
  },
  DATABASE_POOL_IDLE: {
    doc: "The maximum time, in milliseconds, that a connection can be idle before being released.",
    format: Number,
    default: 10000,
    env: "DATABASE_POOL_IDLE",
  },
  SECRET_KEY: {
    doc: "SECRET_KEY",
    format: String,
    default: "0.0.0.0",
    env: "SECRET_KEY",
  },
  PUBLISHABLE_KEY: {
    doc: "PUBLISHABLE_KEY",
    format: String,
    default: "0.0.0.0",
    env: "PUBLISHABLE_KEY",
  },
});

module.exports = { config };
