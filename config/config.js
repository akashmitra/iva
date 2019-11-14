const _ = require('lodash');

// Module variables
const config = require('../resources/config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// As a best practice all global variables should be referenced via global. Syntax and their names should always begin with 'g'
global.gConfig = finalConfig;

// Log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);