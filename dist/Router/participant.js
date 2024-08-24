"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ErrorHandler_1 = __importDefault(require("../Tools/ErrorHandler"));
const participant_1 = __importDefault(require("../Controller/participant"));
const authinticated_1 = __importDefault(require("../Middleware/authinticated"));
const participantRouter = (0, express_1.Router)();
//Create new participant :
participantRouter.post('/', (0, ErrorHandler_1.default)(participant_1.default.createParticipant));
//Get participants :(admin)
participantRouter.get('/', authinticated_1.default.main, (0, ErrorHandler_1.default)(participant_1.default.getParticipants));
//Get filtred participants (answer : true | false):(admin)
participantRouter.get('/:answer', authinticated_1.default.main, (0, ErrorHandler_1.default)(participant_1.default.getParticipants));
//Get winner :(admin)
participantRouter.get('/winner/get', authinticated_1.default.main, (0, ErrorHandler_1.default)(participant_1.default.getWinner));
exports.default = participantRouter;
