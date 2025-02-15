const zod = require("zod");

const signupSchema = zod.object({
  firstName: zod.string().min(4),
  lastName: zod.string().min(4),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

module.exports = {
  signupSchema,
  signinSchema,
  updateSchema,
};
