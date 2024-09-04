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
const root_1 = __importDefault(require("../Tools/HttpException/root"));
class ParticipantController {
    static createParticipant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = contest_1.addParticipantSchema.parse(req.body);
            return yield prismaClient_1.default.$transaction((ts) => __awaiter(this, void 0, void 0, function* () {
                //check if there is another participant with the same phone number :
                const participant = yield ts.participant.findFirst({
                    where: {
                        phone: validatedData.phone,
                    },
                });
                if (participant) {
                    throw new root_1.default("هذا الرقم تم إستخدامه بالفعل", 400);
                }
                else {
                    const question = yield ts.question.findFirst({
                        select: {
                            answer: true,
                        }
                    });
                    if (validatedData.answer.join("-") == (question === null || question === void 0 ? void 0 : question.answer)) {
                        yield ts.participant.create({
                            data: {
                                firstName: validatedData.firstName,
                                lastName: validatedData.lastName,
                                phone: validatedData.phone,
                                answer: true
                            }
                        });
                    }
                    else {
                        yield ts.participant.create({
                            data: {
                                firstName: validatedData.firstName,
                                lastName: validatedData.lastName,
                                phone: validatedData.phone,
                                answer: false
                            }
                        });
                    }
                }
                return res.status(201).json({
                    ok: true,
                    msg: "تم تسجيل إجابتك",
                });
            }));
        });
    }
    static getParticipants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            if (req.params.answer) {
                where = {
                    answer: JSON.parse(req.params.answer)
                };
            }
            const participants = yield prismaClient_1.default.participant.findMany({
                where: where,
                select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                    answer: true,
                    createdAt: true,
                },
                skip: +(req.query.skip || 0),
            });
            if (participants.length === 0) {
                return res.json({
                    ok: false,
                    msg: "لا يوجد أي مشاركين حاليا"
                });
            }
            return res.status(200).json({
                ok: true,
                data: participants,
            });
        });
    }
    static getWinner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const participants = yield prismaClient_1.default.participant.findMany({
                where: {
                    answer: true,
                },
                select: {
                    id: true,
                },
            });
            if (participants.length === 0) {
                return res.json({
                    ok: false,
                    msg: "لا يوجد أي مشاركين حاليا"
                });
            }
            let idArr = [];
            participants.forEach((participant) => {
                idArr.push(participant.id);
            });
            const winnerIndex = Math.floor(Math.random() * idArr.length);
            const winner = yield prismaClient_1.default.participant.findUnique({
                where: {
                    id: idArr[winnerIndex]
                },
                select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                }
            });
            return res.status(200).json({
                ok: true,
                data: winner,
            });
        });
    }
}
exports.default = ParticipantController;
