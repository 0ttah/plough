#!/usr/bin/env node --no-warnings
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const colors_1 = __importDefault(require("colors"));
const yargs_1 = __importDefault(require("yargs"));
const functions_1 = require("./functions");
console.clear();
const yargv = yargs_1.default
    .command("download", "Download card set", {
    output: {
        alias: "o",
        default: "./sets",
        describe: "Output location",
        type: "string",
    },
    pictures: {
        alias: "p",
        default: false,
        describe: "Download all images for cards",
        type: "boolean",
    },
    sets: {
        alias: "s",
        array: true,
        default: [0, 1],
        describe: "Card sets to download",
    },
    wipe: {
        default: false,
        describe: "Wipe all files from output directory?",
    },
}, (argv) => {
    const sets = argv.s;
    const valid = sets.every((x) => typeof x === "number");
    if (!valid) {
        console.log(colors_1.default.red.bold.underline("Sets must be numbers!"));
        console.log("plough download --help");
        return valid;
    }
    downloadCommandHandler(argv);
})
    .showHelpOnFail(true)
    .example("d", "plough download -p -s 0 1 -o ./artifact/assets")
    .alias("d", "download")
    .alias("h", "help")
    .help()
    .argv;
function downloadCommandHandler(argv) {
    const setIds = argv.s;
    const artifactAPI = axios_1.default.create({
        baseURL: "https://playartifact.com/cardset/",
        method: "get",
        transformResponse: [functions_1.transformToJSON],
    });
    setIds.map((id) => downloadSet(id, artifactAPI, argv));
}
async function downloadSet(setId, api, argv) {
    console.log(argv);
    const outputPath = argv.output;
    // Wipe folder if set
    if (argv.wipe) {
        console.log(`Wiping: ${outputPath}`);
        functions_1.removeFolder(outputPath);
    }
    // Make request for sets
    const setUrl = await functions_1.getSetCDN(api, setId)
        .then((cdn) => {
        functions_1.getSetJSON(cdn)
            .then((set) => functions_1.saveSet(set, outputPath))
            .then((value) => console.log(`Success! Set #${setId} downloaded.`))
            .catch((err) => console.log("Error getting set " + cdn.setId));
    })
        .catch((err) => console.log(err));
    return true;
}
//# sourceMappingURL=index.js.map