"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// get set json
async function getSetJSON(cdn) {
    console.log("Retrieving set " + cdn.setId, cdn.fullURL);
    return axios_1.default
        .get(cdn.fullURL, {
        transformResponse: (data) => JSON.parse(data),
    })
        .then((response) => response.data);
}
exports.getSetJSON = getSetJSON;
//# sourceMappingURL=getSetJSON.js.map