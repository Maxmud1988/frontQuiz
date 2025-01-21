import * as yup from "yup";

export const registrationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Terms is required"),
});
