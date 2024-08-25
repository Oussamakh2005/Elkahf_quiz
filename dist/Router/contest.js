"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contest_1 = __importDefault(require("../Controller/contest"));
const ErrorHandler_1 = __importDefault(require("../Tools/ErrorHandler"));
const authinticated_1 = __importDefault(require("../Middleware/authinticated"));
const contestRouter = (0, express_1.Router)();
//create new question : (admin)
contestRouter.post('/question', authinticated_1.default.main, (0, ErrorHandler_1.default)(contest_1.default.addNewQuestions));
//get contest question :
contestRouter.get('/question', (0, ErrorHandler_1.default)(contest_1.default.getQuestions));
exports.default = contestRouter;
