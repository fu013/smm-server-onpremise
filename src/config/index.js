"use strict";

const dotenv = require("dotenv");
const yaml = require("js-yaml");
const { readFileSync } = require("fs");
const { join } = require("path");

// Load environment variables from .env file
dotenv.config();

// Load configurations from YAML file
const yaml_config_filename = process.env.APP_CONFIG_FILE;
let yaml_config = {};

try {
  const custom_config = yaml_config_filename
    ? yaml.load(readFileSync(yaml_config_filename, "utf8"))
    : {};
  const default_config = yaml.load(
    readFileSync(join(__dirname, "default.yaml"), "utf8")
  );
  yaml_config = {
    ...default_config,
    ...custom_config,
  };
} catch (err) {
  throw new Error(e);
}

// Configuration Priorities
// - Environment Variables
// - Custom YAML Configuration
// - Default YAML Configuration
const config = {
  redis: {
    primary: {
      url: process.env.REDIS_URL || yaml_config.redis.primary.url,
    },
  },
};

module.exports = config;
