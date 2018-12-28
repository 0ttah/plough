"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
function makeCardFolders(folderPath, ids) {
    // create folder for each card id
    console.log("Creating card fragment folders");
    ids.map(async (id) => {
        shelljs_1.default.mkdir("-p", folderPath + "/" + id);
    });
    console.log("Card fragment folders created");
}
exports.makeCardFolders = makeCardFolders;
//# sourceMappingURL=makeCardFolders.js.map