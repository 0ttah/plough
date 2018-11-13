"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const functions_1 = require("./functions");
async function fragmentCard(card, setPathFolder, log) {
    const json = JSON.stringify(card, undefined, 2);
    const filePath = path_1.default.normalize(setPathFolder + "/" + card.card_id + "/" + "card.json");
    return await functions_1.writeFile(filePath, json, {
        encoding: "utf8",
    }, () => {
        if (log) {
            console.log(`Saved card fragment ${card.card_name.english}`);
        }
    });
}
exports.fragmentCard = fragmentCard;
//# sourceMappingURL=fragmentCards.js.map