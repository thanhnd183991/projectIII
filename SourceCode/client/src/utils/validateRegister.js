const validateRegister = (username, email, password, confirmPassword) => {
  let errors = {};
  if (confirmPassword !== "" || username !== "") {
    if (
      !username.match(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_.-\s]*$/
      )
    ) {
      errors.username = "chỉ được chứa ký tự";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "phải trùng khớp mật khẩu";
    }
  }
  if (!email) {
    errors.email = "email được yêu cầu";
  } else if (!email.includes("@")) {
    errors.email = "email bao gồm @";
  }
  if (!password) {
    errors.password = "mật khẩu được yêu cầu";
  } else if (!(password.length > 2)) {
    errors.password = "mật khẩu lớn hơn 2 ký tự";
  }
  return errors;
};

export default validateRegister;
