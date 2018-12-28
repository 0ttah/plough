"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function writeFile(filePath, data, options, successCallback) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(filePath, data, options, (err) => {
            if (err) {
                reject(false);
            }
            if (successCallback) {
                successCallback();
            }
            resolve(true);
        });
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=writeFile.js.map