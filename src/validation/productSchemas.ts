import * as yup from "yup";

export const createSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name required"),
  description: yup
    .string()
    .required("Name required"),
  categoryId: yup
    .string()
    .required("Category required"),
  availableCount: yup
    .string()
    .matches(
      /^\d+$/,
      "Only number allowed"
    )
    .required("Available count required"),
  price: yup
    .string()
    .required("Price required")
    .matches(
      /^[+-]?\d+(\.\d+)?$/,
      "Only number allowed"
    ),
  images: yup
    .array()
    .min(1, "Image(s) required"),
  attributes: yup
    .array()
    .min(1, "Attribute(s) required")
});
