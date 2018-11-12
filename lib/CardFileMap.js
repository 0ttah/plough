"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardFileMap {
    constructor(entries) {
        this.entries = [];
        this.entries = entries || [];
    }
    add(entry) {
        this.entries.concat(entry);
        return this;
    }
}
exports.CardFileMap = CardFileMap;
class CardFileMapEntry {
    constructor(model) {
        Object.assign(this, model);
    }
    get fileName() {
        const fileName = this.name
            .replace(/ /g, "_")
            .replace(/'/g, "")
            .replace(/\./g, "")
            .replace(/-/g, "")
            .replace(/!/g, "")
            .toLowerCase();
        return fileName;
    }
}
exports.CardFileMapEntry = CardFileMapEntry;
//# sourceMappingURL=CardFileMap.js.map