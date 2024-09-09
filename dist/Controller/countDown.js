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
class CountDownController {
    static addTime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.$transaction((ts) => __awaiter(this, void 0, void 0, function* () {
                yield ts.countDown.deleteMany({});
                yield ts.countDown.create({
                    data: {
                        time: req.body.time,
                    }
                });
                return res.status(201).json({
                    ok: true,
                    msg: "تم إنشاء العد التنازلي بنجاح",
                });
            }));
        });
    }
    static getTime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const coundown = yield prismaClient_1.default.countDown.findFirst({
                select: {
                    time: true,
                },
            });
            if (!coundown) {
                return res.status(201).json({
                    ok: false,
                    msg: "لم يتم العثور على أي عد تنازلي",
                });
            }
            return res.status(200).json({
                ok: true,
                data: coundown === null || coundown === void 0 ? void 0 : coundown.time
            });
        });
    }
}
exports.default = CountDownController;
