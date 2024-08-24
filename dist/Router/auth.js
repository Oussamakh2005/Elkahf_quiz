"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../Controller/auth"));
const ErrorHandler_1 = __importDefault(require("../Tools/ErrorHandler"));
const adminRouter = (0, express_1.Router)();
//login :
adminRouter.post('/', (0, ErrorHandler_1.default)(auth_1.default.login));
exports.default = adminRouter;
