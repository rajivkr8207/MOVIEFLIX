import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}


export const MovieValidator = [
    body("title").isString().withMessage("Title must be a string"),
    body("description").isString().withMessage("Description must be a string"),
    body("poster").isString().withMessage("Poster must be a string"),
    body("releasedate").isISO8601().withMessage("Release date must be a valid date"),
    body("trailer").isString().withMessage("Trailer must be a string"),
    body("genre").isArray({ min: 1 }).withMessage("Genre must be an array with at least one item"),
    body("category").isString().withMessage("Category must be a string"),
    validate
]