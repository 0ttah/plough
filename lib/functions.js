"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const CardFileMap_1 = require("./CardFileMap/");
const CDN_1 = __importDefault(require("./CDN"));
// Get set CDN
async function getSetCDN(api, id) {
    const url = `/${id}/`;
    if (id < 0) {
        throw new Error("Set numbers cannot be below 0");
    }
    return api.get(url).then((response) => {
        return response.data;
    }).then((data) => {
        return new CDN_1.default(Object.assign({}, data, { setId: id }));
    });
}
exports.getSetCDN = getSetCDN;
// get set json
async function getSetJSON(cdn) {
    console.log("Retrieving set " + cdn.setId, cdn.fullURL);
    return axios_1.default
        .get(cdn.fullURL, {
        transformResponse: [transformToJSON],
    })
        .then((response) => response.data);
}
exports.getSetJSON = getSetJSON;
async function saveSet(set, filePath, getImages) {
    // Make folder for set
    const setId = set.card_set.set_info.set_id;
    const setFolderPath = path_1.default.normalize(`${filePath}/sets/set-${setId}/`);
    const setFilePath = path_1.default.normalize(`${setFolderPath}set.json`);
    shelljs_1.default.mkdir("-p", setFolderPath);
    // save json file
    const jsonString = JSON.stringify(set, undefined, 2);
    fs_1.default.writeFile(setFilePath, jsonString, (err) => {
        if (err) {
            throw err;
        }
    });
    // Save images
    if (getImages) {
        // create cards folder
        shelljs_1.default.mkdir("-p", setFolderPath + "/cards");
    }
    // save fragments
    return true;
}
exports.saveSet = saveSet;
function createCardMap(filePath, set) {
    const cardEntries = set.card_set.card_list.map((card) => new CardFileMap_1.CardFileMapEntry(card.card_name.english, card.card_id));
    const cardMap = new CardFileMap_1.CardFileMap();
    cardMap.add(cardEntries);
}
exports.createCardMap = createCardMap;
async function downloadImages() {
}
exports.downloadImages = downloadImages;
/**
 * Transforms JSON response to an object.
 *
 * @param {string} data
 * @returns {Promise<object>}
 */
function transformToJSON(data) {
    return JSON.parse(data);
}
exports.transformToJSON = transformToJSON;
function removeFolder(filePath) {
    shelljs_1.default.rm("-rf", filePath);
}
exports.removeFolder = removeFolder;
//# sourceMappingURL=functions.js.map