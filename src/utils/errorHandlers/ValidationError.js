const { StatusCodes } = require("http-status-codes");
const AppError = require("./AppError");

class ValidationError extends AppError{
    constructor(error) {
        console.log("reached")
        super(error.name, error.message, error.explanation, StatusCodes.BAD_REQUEST);
    }
}
module.exports = ValidationError