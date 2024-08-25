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
    static addNewQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = contest_1.addQuestionSchema.parse(req.body);
            return yield prismaClient_1.default.$transaction((ts) => __awaiter(this, void 0, void 0, function* () {
                const oldQuestion = yield ts.question.findFirst({});
                if (oldQuestion) {
                    yield ts.question.deleteMany({});
                    yield ts.participant.deleteMany({});
                }
                let questionData = {
                    questions: [],
                    options: [],
                    answers: []
                };
                validatedData.forEach(element => {
                    questionData.questions.push(element.question);
                    questionData.options.push(`${element.option1}-${element.option2}-${element.option3}`),
                        questionData.answers.push(element.answer);
                });
                yield ts.question.create({
                    data: {
                        question: questionData.questions.join('-'),
                        options: questionData.options.join('-'),
                        answer: questionData.answers.join('-'),
                    }
                });
                return res.status(201).json({
                    ok: true,
                    msg: "تم إنشاء الاسئله بنجاح",
                });
            }));
        });
    }
    static getQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield prismaClient_1.default.question.findFirst({});
            let questions = question === null || question === void 0 ? void 0 : question.question.split('-');
            let options = question === null || question === void 0 ? void 0 : question.options.split('-');
            let answers = question === null || question === void 0 ? void 0 : question.answer.split('-');
            return res.status(200).json({
                ok: true,
                data: [
                    {
                        question: questions === null || questions === void 0 ? void 0 : questions[0],
                        option1: options === null || options === void 0 ? void 0 : options[0],
                        option2: options === null || options === void 0 ? void 0 : options[1],
                        option3: options === null || options === void 0 ? void 0 : options[2],
                        answer: answers === null || answers === void 0 ? void 0 : answers[0],
                    },
                    {
                        question: questions === null || questions === void 0 ? void 0 : questions[1],
                        option1: options === null || options === void 0 ? void 0 : options[3],
                        option2: options === null || options === void 0 ? void 0 : options[4],
                        option3: options === null || options === void 0 ? void 0 : options[5],
                        answer: answers === null || answers === void 0 ? void 0 : answers[1],
                    },
                    {
                        question: questions === null || questions === void 0 ? void 0 : questions[2],
                        option1: options === null || options === void 0 ? void 0 : options[6],
                        option2: options === null || options === void 0 ? void 0 : options[7],
                        option3: options === null || options === void 0 ? void 0 : options[8],
                        answer: answers === null || answers === void 0 ? void 0 : answers[2],
                    },
                ]
            });
        });
    }
}
exports.default = ContestController;
