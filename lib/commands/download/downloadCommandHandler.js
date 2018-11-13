"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_emoji_1 = require("node-emoji");
const functions_1 = require("../../functions");
const downloadSet_1 = __importDefault(require("./downloadSet"));
function downloadCommandHandler(argv) {
    const setIds = argv.s;
    const artifactAPI = axios_1.default.create({
        baseURL: "https://playartifact.com/cardset/",
        method: "get",
        transformResponse: [functions_1.transformToJSON],
    });
    console.log("Ploughing", node_emoji_1.emoji.tractor);
    // Wipe folder if set
    if (argv.wipe) {
        const outputPath = argv.output;
        console.log(`Wiping: ${outputPath}`);
        functions_1.removeFolder(outputPath);
    }
    // Wait for sets to be downloaded
    const sets = setIds.map(async (id) => downloadSet_1.default(id, artifactAPI, argv));
    Promise
        .all(sets)
        .then((values) => {
        const msg = "Finished ploughing";
        console.log(msg, node_emoji_1.emoji.tractor);
    });
}
exports.default = downloadCommandHandler;
//# sourceMappingURL=downloadCommandHandler.js.map