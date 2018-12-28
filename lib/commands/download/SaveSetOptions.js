"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaveSetOptions {
    constructor(options) {
        this.downloadImages = false;
        this.redownloadImages = false;
        this.fragmentCards = false;
        this.log = false;
        this.language = "default";
        Object.assign(this, options);
    }
}
exports.default = SaveSetOptions;
//# sourceMappingURL=SaveSetOptions.js.map