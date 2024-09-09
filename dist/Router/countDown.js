"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authinticated_1 = __importDefault(require("../Middleware/authinticated"));
const ErrorHandler_1 = __importDefault(require("../Tools/ErrorHandler"));
const countDown_1 = __importDefault(require("../Controller/countDown"));
const countDownRouter = (0, express_1.Router)();
countDownRouter.post('/', authinticated_1.default.main, (0, ErrorHandler_1.default)(countDown_1.default.addTime));
countDownRouter.get('/', (0, ErrorHandler_1.default)(countDown_1.default.getTime));
exports.default = countDownRouter;
