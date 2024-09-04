"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = __importDefault(require("./root"));
class BadRequest extends root_1.default {
    constructor(message) {
        super(message, 400);
    }
}
exports.default = BadRequest;
