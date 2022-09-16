import { Router } from "express";

// helpers
import { verifyAccessToken } from "../helpers/jwt";

// routes
import auth from "./auth";
import blog from "./blog";

const router = Router();

router.get("/", (req, res) => {
  res.end("hey");
});

router.use("/auth", auth);
router.use("/blog", blog);

export default router;
