const errorResp = require("./error_response");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        next(new errorResp(error, "An exceptoin error", 500));
    });
};

module.exports = asyncHandler;