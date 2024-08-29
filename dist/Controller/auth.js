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
const prismaClient_1 = __importDefault(require("../Tools/prismaClient"));
const bcrypt_1 = require("bcrypt");
const token_1 = __importDefault(require("../Services/token"));
const BadRequest_1 = __importDefault(require("../Tools/HttpException/BadRequest"));
class Auth {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield prismaClient_1.default.admin.findFirst({});
            if (req.body.username === (admin === null || admin === void 0 ? void 0 : admin.username) && (0, bcrypt_1.compareSync)(req.body.password, admin === null || admin === void 0 ? void 0 : admin.password)) {
                const token = token_1.default.generate(admin === null || admin === void 0 ? void 0 : admin.id);
                res.cookie("token", token, {
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: "none"
                });
                res.status(200).json({
                    ok: true,
                    msg: "تم تسجيل الدخول بنجاح",
                });
            }
            else {
                throw new BadRequest_1.default("البيانات المقدمة خاطئة", 401);
            }
        });
    }
}
exports.default = Auth;
