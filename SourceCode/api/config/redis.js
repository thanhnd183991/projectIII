const Redis = require("ioredis");
const { __prod__ } = require("../constants");
let redis = null;
// if (!__prod__) {
redis = new Redis();
// }

module.exports = redis;
