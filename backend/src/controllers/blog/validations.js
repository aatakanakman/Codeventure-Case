import Joi from "joi";

const BlogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  photo: Joi.string(),
  content: Joi.string(),
});

export default BlogSchema;
