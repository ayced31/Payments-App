const express = require("express");
const {
  signup,
  signin,
  updateUser,
  bulkSearch,
} = require("../controllers/userController");
const {
  signupSchema,
  signinSchema,
  updateSchema,
} = require("../validators/user.validator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs / Email already taken",
    });
  }
  await signup(req, res);
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  await signin(req, res);
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await updateUser(req, res);
});

router.get("/bulk", authMiddleware, bulkSearch);

module.exports = router;
