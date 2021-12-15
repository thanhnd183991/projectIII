const validateRegister = (username, email, password) => {
  if (
    username &&
    !username.match(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_.-\s]*$/
    )
  ) {
    return [
      {
        field: "username",
        message: "username only contains letters, number, _ , . ",
      },
    ];
  }

  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "email must containts @",
      },
    ];
  }

  if (!(password.length > 2) || !password.match(/^[a-zA-Z0-9_.-]*$/)) {
    return [
      {
        field: "password",
        message: "password must be greater than 2 letter and no letter special",
      },
    ];
  }
  return null;
};

module.exports = validateRegister;
