"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const writeFile_1 = require("./writeFile");
async function fragmentCard(card, setPathFolder, transformPlugin) {
    let fragment = card;
    if (transformPlugin) {
        console.log("Hello");
        fragment = transformPlugin.transformFragment(card);
    }
    const json = JSON.stringify(fragment, undefined, 2);
    const filePath = path_1.default.normalize(setPathFolder + "/" + card.card_id + "/" + "card.json");
    return await writeFile_1.writeFile(filePath, json, {
        encoding: "utf8",
    }, () => { return; });
}
exports.fragmentCard = fragmentCard;
//# sourceMappingURL=fragmentCard.js.map