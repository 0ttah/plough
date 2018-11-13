"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardFileMapEntry_1 = __importDefault(require("./CardFileMapEntry"));
class CardFileMap {
    constructor(entries) {
        this.entries = [];
        this.entries = entries || [];
    }
    add(entry) {
        this.entries = this.entries.concat(entry);
        console.log("New card map length", this.entries.length);
        return this;
    }
    static createMap(set) {
        const cardEntries = set.card_set.card_list.map((card) => new CardFileMapEntry_1.default(card.card_name.english, card.card_id, card.card_type));
        const cardMap = new CardFileMap().add(cardEntries);
        return cardMap;
    }
}
exports.default = CardFileMap;
//# sourceMappingURL=CardFileMap.js.map