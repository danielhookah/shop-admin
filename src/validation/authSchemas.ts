import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Bad email format"
    ),
  password: yup.string()
    .min(6, "Min 6 chars")
    .max(40, "Max 40 chars")
    .required("Password required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Bad email format"
    ),
  password: yup
    .string()
    .min(6, "Min 6 chars")
    .max(18, "Max 40 chars")
    .required("Password required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords doesnt match"),
  first_name: yup.string(),
  last_name: yup.string(),
});
