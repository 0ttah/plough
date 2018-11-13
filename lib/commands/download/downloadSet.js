"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const functions_1 = require("../../functions");
const SaveSetOptions_1 = __importDefault(require("../../SaveSetOptions"));
const saveSet_1 = __importDefault(require("./saveSet"));
async function downloadSet(setId, api, argv) {
    const outputPath = argv.output;
    const options = new SaveSetOptions_1.default({ downloadImages: argv.p, redownloadImages: argv.r, fragmentCards: argv.f, log: argv.l });
    // Make request for sets
    return await functions_1.getSetCDN(api, setId)
        .then((cdn) => {
        return functions_1.getSetJSON(cdn)
            .then((set) => saveSet_1.default(set, outputPath, options))
            .then((value) => {
            console.log(colors_1.default.blue(setId + ":"), `Success! Set #${setId} downloaded.`);
            return value;
        })
            .catch((err) => {
            console.log("Error getting set " + cdn.setId, err);
            return false;
        });
    })
        .catch((err) => false);
}
exports.default = downloadSet;
//# sourceMappingURL=downloadSet.js.map