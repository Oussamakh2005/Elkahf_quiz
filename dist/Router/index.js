"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contest_1 = __importDefault(require("./contest"));
const participant_1 = __importDefault(require("./participant"));
const auth_1 = __importDefault(require("./auth"));
const mainRouter = (0, express_1.Router)();
//Contest Router :
mainRouter.use('/contest', contest_1.default);
//Participant Router : 
mainRouter.use('/participant', participant_1.default);
//admin auth :
mainRouter.use('/admin', auth_1.default);
exports.default = mainRouter;
