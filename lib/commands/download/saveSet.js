"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const CardFileMap_1 = require("../../CardFileMap");
const utils_1 = require("../utils");
const downloadImages_1 = require("./downloadImages");
const SaveSetOptions_1 = __importDefault(require("./SaveSetOptions"));
async function saveSet(set, filePath, options = new SaveSetOptions_1.default()) {
    // Make folder for set
    const setId = set.card_set.set_info.set_id;
    const setFolderPath = path_1.default.normalize(`${filePath}/sets/set-${setId}`);
    const setFilePath = path_1.default.normalize(`${setFolderPath}/set.json`);
    shelljs_1.default.mkdir("-p", setFolderPath);
    // save set & card map files
    const outputSet = options.transformPlugin ? options.transformPlugin.transformSet(set) : set;
    const writeSetFile = utils_1.writeFile(setFilePath, JSON.stringify(outputSet, undefined, 2), null, () => {
        console.log(colors_1.default.blue(setId + ":"), "Saved set.json");
    });
    const writeFileMap = utils_1.writeFile(setFolderPath + "/cardmap.json", JSON.stringify(CardFileMap_1.CardFileMap.createMap(set), undefined, 2), null, () => {
        console.log(colors_1.default.blue(setId + ":"), "Card file map created.");
    });
    let jobs = [writeSetFile, writeFileMap];
    // make cards folder
    if (options.downloadImages || options.fragmentCards) {
        const cardsFolderPath = path_1.default.normalize(setFolderPath + "/cards");
        shelljs_1.default.mkdir("-p", cardsFolderPath);
        utils_1.makeCardFolders(cardsFolderPath, set.card_set.card_list.map((card) => card.card_id));
    }
    // Save images
    if (options.downloadImages) {
        // create cards folder
        const cardPath = setFolderPath + "/cards";
        const downloadImageJob = downloadImages_1.downloadAllCardsImages(set.card_set.card_list, cardPath, options.language);
        jobs = [...jobs, downloadImageJob];
    }
    if (options.fragmentCards) {
        // Fragment cards
        const fragmentCardsJob = set.card_set.card_list.map(async (card) => utils_1.fragmentCard(card, setFolderPath + "/cards", options.transformPlugin));
        jobs = [...jobs, ...fragmentCardsJob];
    }
    // save fragments
    console.log(colors_1.default.blue(setId + ":"), colors_1.default.bold.magenta("Waiting for jobs to complete."));
    return Promise
        .all(jobs)
        .then(() => {
        console.log(colors_1.default.blue(setId + ":"), "All jobs completed!");
        return true;
    })
        .catch((err) => {
        console.log(colors_1.default.red(`${setId}:`), err);
        return false;
    });
}
exports.default = saveSet;
//# sourceMappingURL=saveSet.js.map