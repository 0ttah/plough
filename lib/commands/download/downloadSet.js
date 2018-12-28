"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const getSetCDN_1 = require("./getSetCDN");
const getSetJSON_1 = require("./getSetJSON");
const saveSet_1 = __importDefault(require("./saveSet"));
const SaveSetOptions_1 = __importDefault(require("./SaveSetOptions"));
async function downloadSet(setId, api, argv, transformPlugin) {
    const outputPath = argv.output;
    const options = new SaveSetOptions_1.default({ language: argv.language, downloadImages: argv.p, redownloadImages: argv.r, fragmentCards: argv.f, transformPlugin, log: argv.l }); // @TODO fix logging argv.l is language not log
    // Make request for sets
    return await getSetCDN_1.getSetCDN(api, setId)
        .then((cdn) => {
        return getSetJSON_1.getSetJSON(cdn)
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