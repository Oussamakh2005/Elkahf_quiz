"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParticipantSchema = exports.addQuestionSchema = void 0;
const zod_1 = __importStar(require("zod"));
//add new question :
exports.addQuestionSchema = zod_1.default.array(zod_1.default.object({
    question: zod_1.default.string().min(5).refine((val) => !val.includes("-")),
    option1: zod_1.default.string().min(1).refine((val) => !val.includes("-")),
    option2: zod_1.default.string().min(1).refine((val) => !val.includes("-")),
    option3: zod_1.default.string().min(1).refine((val) => !val.includes("-")),
    answer: zod_1.default.string().regex(/^[123]$/),
})).length(3);
//add new participant :
exports.addParticipantSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3),
    lastName: zod_1.default.string(),
    phone: zod_1.default.string().regex(/^0[567]\d{8}$/),
    answer: zod_1.default.array((0, zod_1.string)().regex(/^[123]$/)).length(3),
});
