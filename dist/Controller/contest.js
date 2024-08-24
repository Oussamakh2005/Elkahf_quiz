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
const contest_1 = require("../Schema/contest");
const prismaClient_1 = __importDefault(require("../Tools/prismaClient"));
class ContestController {
    static addNewQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = contest_1.addQuestionSchema.parse(req.body);
            return yield prismaClient_1.default.$transaction((ts) => __awaiter(this, void 0, void 0, function* () {
                const oldQuestion = yield ts.question.findFirst({});
                if (oldQuestion) {
                    yield ts.question.deleteMany({});
                    yield ts.participant.deleteMany({});
                }
                yield ts.question.create({
                    data: {
                        question: validatedData.question,
                        options: `${validatedData.option1}-${validatedData.option2}-${validatedData.option3}`,
                        answer: validatedData.answer,
                    }
                });
                return res.status(201).json({
                    ok: true,
                    msg: "تم إنشاء سؤال جديد بنجاح",
                });
            }));
        });
    }
    static getQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield prismaClient_1.default.question.findFirst({});
            const options = question === null || question === void 0 ? void 0 : question.options.split("-");
            return res.status(200).json({
                ok: true,
                data: {
                    question: {
                        question: question === null || question === void 0 ? void 0 : question.question,
                        option1: options === null || options === void 0 ? void 0 : options[0],
                        option2: options === null || options === void 0 ? void 0 : options[1],
                        option3: options === null || options === void 0 ? void 0 : options[2],
                        answer: question === null || question === void 0 ? void 0 : question.answer,
                    }
                }
            });
        });
    }
}
exports.default = ContestController;
