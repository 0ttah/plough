"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
function removeFolder(filePath) {
    if (filePath !== "/") {
        shelljs_1.default.rm("-rf", filePath);
    }
}
exports.removeFolder = removeFolder;
//# sourceMappingURL=removeFolder.js.map