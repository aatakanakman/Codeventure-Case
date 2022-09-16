import Blog from "../../models/blog";
import Boom from "boom";
import BlogSchema from "./validations";

const Create = async (req, res, next) => {
  const input = req.body;
  const { error } = BlogSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    const blog = new Blog(input);
    const savedData = await blog.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const Get = async (req, res, next) => {
  const { blog_id } = req.params;

  if (!blog_id) {
    return next(Boom.badRequest("Missing paramter (:blog_id)"));
  }

  try {
    const blog = await Blog.findById(blog_id);

    res.json(blog);
  } catch (e) {
    next(e);
  }
};

const limit = 12;
const GetList = async (req, res, next) => {
  let { page } = req.query;

  if (page < 1) {
    page = 1;
  }

  const skip = (parseInt(page) - 1) * limit;

  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(blogs);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  Get,
  GetList,
};
