"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const root_1 = __importDefault(require("./HttpException/root"));
const BadRequest_1 = __importDefault(require("./HttpException/BadRequest"));
const InternalException_1 = __importDefault(require("./HttpException/InternalException"));
const errorHandler = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
        }
        catch (err) {
            let exception;
            if (err instanceof root_1.default) {
                exception = err;
            }
            else if (err instanceof zod_1.ZodError) {
                exception = new BadRequest_1.default("البيانات المقدمة خاطئة", null);
            }
            else {
                exception = new InternalException_1.default("خطأ ما قد حدث", null);
            }
            next(exception);
        }
    });
};
exports.default = errorHandler;
