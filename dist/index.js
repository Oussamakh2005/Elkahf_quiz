"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ExceptionResponse_1 = __importDefault(require("./Tools/ExceptionResponse"));
const Router_1 = __importDefault(require("./Router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//set cookie parser :
app.use((0, cookie_parser_1.default)());
//set cors :
app.use((0, cors_1.default)({
    credentials: true,
}));
//set routers :
app.use('/api', Router_1.default);
//set error response middelware :
app.use(ExceptionResponse_1.default);
app.listen(process.env.PORT);
