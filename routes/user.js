const { Router } = require("express");
const Joi = require("joi");

const userController = require("../controllers/userController");
const { validate } = require("../middleware/validate");
const { isAuth } = require("../middleware/auth");

const router = Router();

const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    password: Joi.string().min(6).max(30).required(),
  }),
});

const loginSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    password: Joi.string().min(6).max(30).required(),
  }),
});

router.get("/all", isAuth(true), userController.getAllUsers);
router.post("/create", validate(registerSchema), userController.createUser);
router.post("/login", validate(loginSchema), userController.login);

module.exports = router;
