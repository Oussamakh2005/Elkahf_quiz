"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = __importDefault(require("./root"));
class InternalException extends root_1.default {
    constructor(message, err) {
        super(message, 500, null);
    }
}
exports.default = InternalException;
