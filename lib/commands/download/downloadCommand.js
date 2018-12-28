"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const colors_1 = __importDefault(require("colors"));
const node_emoji_1 = require("node-emoji");
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("../utils");
const downloadSet_1 = __importDefault(require("./downloadSet"));
exports.command = ["download", "d"];
exports.desc = "Download card sets";
exports.example = "HELLO";
// @TODO Switch to function form builder
exports.builder = {
    output: {
        alias: "o",
        default: "./assets/",
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
    redownload: {
        default: false,
        describe: "Redownload images if they exist on the filesystem.",
        alias: "r",
        type: "boolean",
    },
    fragment: {
        default: false,
        describe: "Split cards into JSON fragments and place them into card folders.",
        alias: "f",
        type: "boolean",
    },
    wipe: {
        default: false,
        describe: "Wipe all files from output directory?",
    },
    transform: {
        alias: "t",
        type: "string",
        default: false,
        describe: "Path to transform plugin.",
    },
    language: {
        alias: "l",
        type: "string",
        default: "default",
        describe: "Language of card.",
    },
};
async function handler(argv) {
    // @TODO Find a option that limits -s to an arroy of numbers so this check can be removed.
    const valid = argv.sets.every((x) => typeof x === "number");
    if (!valid) {
        console.log(colors_1.default.red.bold.underline("Sets must be numbers!"));
        console.log("plough download --help");
        yargs_1.default.exitProcess(true);
    }
    const setIds = argv.s;
    const artifactAPI = axios_1.default.create({
        baseURL: "https://playartifact.com/cardset/",
        method: "get",
        transformResponse: (data) => JSON.parse(data),
    });
    console.log("Ploughing", node_emoji_1.emoji.tractor);
    // Wipe folder if set
    if (argv.wipe) {
        const outputPath = argv.output;
        console.log(`Wiping: ${outputPath}`);
        utils_1.removeFolder(outputPath);
    }
    let transformPlugin;
    if (argv.transform) {
        await loadPlugin(path_1.default.resolve(argv.transform))
            .then((plugin) => {
            transformPlugin = plugin;
        })
            .catch((err) => {
            process.exit(0);
        });
    }
    // Wait for sets to be downloaded
    const sets = setIds.map((id) => downloadSet_1.default(id, artifactAPI, argv, transformPlugin));
    Promise
        .all(sets)
        .then(() => {
        const msg = "Finished ploughing";
        console.log(msg, node_emoji_1.emoji.tractor);
    });
}
exports.handler = handler;
async function loadPlugin(pluginPath) {
    try {
        const plugin = await Promise.resolve().then(() => __importStar(require(pluginPath)));
        console.log(colors_1.default.bgGreen(`Loaded plugin ${pluginPath}`));
        return new plugin.default();
    }
    catch (err) {
        console.error(colors_1.default.bgRed(`Could not load plugin from ${pluginPath}`), err);
        throw new Error();
    }
}
//# sourceMappingURL=downloadCommand.js.map