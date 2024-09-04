"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptionResponse = (exception, req, res, next) => {
    return res.status(exception.status).json({
        ok: false,
        msg: exception.message,
    });
};
exports.default = exceptionResponse;
