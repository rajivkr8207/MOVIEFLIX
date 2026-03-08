import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        success: false,
        errors: errors.array()
    });
};

export const RegisterValidator = [
    body("name")
        .exists().withMessage("Name is required")
        .bail()
        .isString().withMessage("Username should be string"),

    body("email")
        .exists().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email address"),

    body("password")
        .exists().withMessage("Password is required")
        .bail()
        .isString()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    validate
];

export const LoginValidator = [
    body("email")
        .exists().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email address"),

    body("password")
        .exists().withMessage("Password is required")
        .bail()
        .isString().withMessage("Password should be string"),

    validate
];