const checkTokenInSocket = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const userID = socket.handshake.auth.userID;
      // console.log(token)
      let decodeData;
      if (token) {
        decodeData = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(userID, decodeData)
        if (userID == decodeData?.id) {
          next();
        } else {
          const err = new Error("có lỗi xảy ra vui lòng đăng nhập lại");
          next(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = checkTokenInSocket;
