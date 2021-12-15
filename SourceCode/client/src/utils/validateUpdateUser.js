const validateUpdateUser = (username, email) => {
  let errors = {};
  if (!username) {
    errors.username = "điển đầy đủ thông tin";
  }
  if (
    username &&
    !username.match(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_.-\s]*$/
    )
  ) {
    errors.username = "chỉ được chứa ký tự";
  }
  if (!email) {
    errors.email = "email được yêu cầu";
  } else if (!email.includes("@")) {
    errors.email = "email bao gồm @";
  }
  return errors;
};

export default validateUpdateUser;
