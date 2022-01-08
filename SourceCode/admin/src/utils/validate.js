import * as yup from "yup";
export const validationLoginSchema = yup.object({
  email: yup.string().required("trường email bắt buộc"),
  password: yup.string().required().min(2, "nhiều hơn 2 ký tự"),
});

export const validationUpsertUserSchema = yup.object({
  username: yup
    .string()
    .required("người dùng được yêu cầu")
    .min(2, "nhiều hơn 2 ký tự")
    .max(20, "ít hơn 20 ký tự"),
  email: yup.string().email("sai định dạng email").required("email bắt buộc"),
  password: yup
    .string()
    .required("mật khẩu được yêu cầu")
    .min(2, "nhiều hơn 2 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "phải khớp với mật khẩu"),
});
export const validationMovieSchema = yup.object({
  title: yup.string().required("trường nhan đề bắt buộc"),
  desc: yup
    .string()
    .required("trường mô tả bắt buộc")
    .min(50, "nhiều hơn 50 ký tự"),
  year: yup
    .number()
    .min(1800, "năm lớn hơn 1800")
    .max(2022, "năm nhỏ hơn 2022")
    .required("trường bắt buộc"),
  genre: yup
    .array()
    .min(3, "You need at least three friends")
    .required("Go out! Make your life enjoyable!"),
});

export const validationSeriesSchema = yup.object({
  title: yup.string().required("trường nhan đề bắt buộc"),
});
