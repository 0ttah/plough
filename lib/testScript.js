"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformPlugin_1 = require("./plugins/TransformPlugin");
class ExampleCard extends TransformPlugin_1.TransformPlugin {
    constructor() {
        super();
        this.name = "Test";
        console.log("Constructed tested");
    }
    transformSet(set) {
        return {
            name: "Test",
        };
    }
    transformFragment(fragment) {
        console.log("fragged");
        return {
            name: fragment.card_name,
        };
    }
}
exports.default = ExampleCard;
//# sourceMappingURL=testScript.js.map