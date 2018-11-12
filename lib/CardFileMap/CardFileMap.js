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
exports.default = CardFileMap;
//# sourceMappingURL=CardFileMap.js.map