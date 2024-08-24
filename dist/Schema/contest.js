"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParticipantSchema = exports.addQuestionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
//add new question :
exports.addQuestionSchema = zod_1.default.object({
    question: zod_1.default.string().min(5),
    option1: zod_1.default.string().min(1).refine((val) => !val.includes("-"), ' "-" النص لا يمكن أن يحتوي  على الرمز'),
    option2: zod_1.default.string().min(1).refine((val) => !val.includes("-"), '"-" النص لا يمكن أن يحتوي  على الرمز'),
    option3: zod_1.default.string().min(1).refine((val) => !val.includes("-"), '"-" النص لا يمكن أن يحتوي  على الرمز'),
    answer: zod_1.default.string().regex(/^[123]$/, "الإجابة يجب أن تكون 1,2 أو 3"),
});
//add new participant :
exports.addParticipantSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3),
    lastName: zod_1.default.string(),
    phone: zod_1.default.string().regex(/^0[567]\d{8}$/, 'رقم الهاتف يجب أن يبدأ ب 05 , 06 او 07 و أن يحتوي على  10 أرقام'),
    answer: zod_1.default.string().min(1).max(1),
});
