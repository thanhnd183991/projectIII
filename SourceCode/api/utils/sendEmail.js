const axios = require("axios");
const { v4 } = require("uuid");
const redis = require("../config/redis");
const { FORGOT_PASSWORD_PREFIX } = require("../constants");
const sendEmail = async (toEmail, userID) => {
  const token = v4();
  const options = {
    method: "POST",
    url: "https://email-sender1.p.rapidapi.com/",
    params: {
      txt_msg: "test of the body",
      to: `${toEmail}`,
      from: "sender-name",
      subject: "change password",
      bcc: "bcc-mail@gmail.com",
      reply_to: "reply-to@gmail.com",
      html_msg: `<html><body><a href='http://localhost:3000/change_password/${token}'>cập nhật mật khẩu trong vòng 15 phút</a></body></html>`,
      cc: "cc-mail@gmail.com",
    },
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": process.env.RAPIDAPI_HOST_MAIL,
      "x-rapidapi-key": process.env.RAPIDAPI_KEY_MAIL,
    },
    data: { key1: "value", key2: "value" },
  };
  try {
    const rs = await axios.request(options);
    // console.log("send mail", rs);
    if (redis) {
     await redis.set(
        FORGOT_PASSWORD_PREFIX + token,
        userID,
        "ex",
        1000 * 60 * 15 // 15 minutes
      );
      return "OK";
    } else {
      const rs = "redis not found";
      return rs;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
module.exports = sendEmail;
