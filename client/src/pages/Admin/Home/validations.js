import * as yup from "yup";

const newBlogScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  content: yup.string().required(),
  photo: yup.string(),
});

export default newBlogScheme;
