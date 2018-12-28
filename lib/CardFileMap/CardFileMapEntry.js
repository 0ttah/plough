"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardFileMapEntry {
    constructor(cardName, cardId, cardType) {
        Object.assign(this, { cardName, cardId, cardType });
    }
    get fileName() {
        const fileName = this.cardName
            .replace(/ /g, "_")
            .replace(/'/g, "")
            .replace(/\./g, "")
            .replace(/-/g, "")
            .replace(/!/g, "")
            .toLowerCase();
        return fileName;
    }
}
exports.default = CardFileMapEntry;
//# sourceMappingURL=CardFileMapEntry.js.map