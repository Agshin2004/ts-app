"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 500;
const start = () => {
    try {
        app_1.default.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
        else {
            console.error('Unknown error', e);
        }
    }
};
start();
