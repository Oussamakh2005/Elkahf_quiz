"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpExeception extends Error {
    constructor(message, status, error) {
        super(message);
        this.message = message;
        this.status = status;
        this.error = error;
    }
}
exports.default = HttpExeception;
