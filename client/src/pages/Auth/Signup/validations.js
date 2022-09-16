import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Geçerli bir email girin").required("Zorunlu Alan"),
  password: yup
    .string()
    .min(5, "Parolanız En Az 5 karakter olmalıdır.")
    .required("Zorunlu Alan"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar Uyuşmuyor.")
    .required("Zorunlu Alan"),
});

export default validations;
