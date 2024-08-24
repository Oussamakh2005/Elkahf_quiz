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
const root_1 = __importDefault(require("../Tools/HttpException/root"));
const token_1 = __importDefault(require("../Services/token"));
const prismaClient_1 = __importDefault(require("../Tools/prismaClient"));
const InternalException_1 = __importDefault(require("../Tools/HttpException/InternalException"));
class Authinticated {
    static main(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.cookies.token) {
                next(new root_1.default("الدخول غير مصرح", 401, null));
            }
            else {
                try {
                    const payload = token_1.default.verify(req.cookies.token);
                    const admin = prismaClient_1.default.admin.findFirst({
                        where: {
                            id: payload.userId
                        }
                    });
                    if (!admin) {
                        next(new root_1.default("الدخول غير مصرح", 401, null));
                    }
                    else {
                        next();
                    }
                }
                catch (err) {
                    next(new InternalException_1.default("خطأ ما قد حدث", null));
                }
            }
        });
    }
}
exports.default = Authinticated;
