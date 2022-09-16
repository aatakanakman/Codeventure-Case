import express from "express";
const router = express.Router();

import Blog from "../controllers/blog";

import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

router.post(
  "/",
  verifyAccessToken,
  grantAccess("createAny", "blog"),
  Blog.Create
);
router.get(
  "/:blog_id",
  // verifyAccessToken,
  // grantAccess('readAny', 'blog'),

  Blog.Get
);

router.get("/", Blog.GetList);

export default router;
