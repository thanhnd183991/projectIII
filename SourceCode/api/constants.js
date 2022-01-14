const __prod__ = process.env.NODE_ENV === "production";
const FORGOT_PASSWORD_PREFIX = "forget-password: ";
const ALL_GENRES_REDIS = "all-genres";
module.exports = { __prod__, FORGOT_PASSWORD_PREFIX, ALL_GENRES_REDIS };
