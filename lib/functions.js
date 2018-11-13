"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
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
function writeFile(filePath, data, options, callback) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(filePath, data, options, (err) => {
            if (err) {
                reject(false);
            }
            callback();
            resolve(true);
        });
    });
}
exports.writeFile = writeFile;
function makeCardFolders(folderPath, ids) {
    // create folder for each card id
    console.log("Creating card fragment folders");
    ids.map(async (id) => shelljs_1.default.mkdir(folderPath + "/" + id));
    console.log("Card fragment folders created");
}
exports.makeCardFolders = makeCardFolders;
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
    if (filePath !== "/") {
        shelljs_1.default.rm("-rf", filePath);
    }
}
exports.removeFolder = removeFolder;
//# sourceMappingURL=functions.js.map