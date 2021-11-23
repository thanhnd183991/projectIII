const __prod__ = process.env.NODE_ENV === "production";
const FORGOT_PASSWORD_PREFIX = "forget-password: ";
module.exports = { __prod__, FORGOT_PASSWORD_PREFIX };
