#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const yargs_1 = __importDefault(require("yargs"));
const downloadCommandHandler_1 = __importDefault(require("./commands/download/downloadCommandHandler"));
const index_1 = require("./commands/transform/index");
const yargv = yargs_1.default
    .command(["transform", "t"], "Transform card set", {
    script: {
        alias: "s",
        required: true,
    },
}, (argv) => {
    console.log(argv);
    index_1.transformCommandHandler(argv);
})
    .command(["download", "d"], "Download card set", {
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
}, (argv) => {
    const sets = argv.s;
    const valid = sets.every((x) => typeof x === "number");
    if (!valid) {
        console.log(colors_1.default.red.bold.underline("Sets must be numbers!"));
        console.log("plough download --help");
        return valid;
    }
    downloadCommandHandler_1.default(argv);
})
    .showHelpOnFail(true)
    .example("d", "plough download -p -s 0 1 -o ./artifact/assets")
    .alias("h", "help")
    .alias("v", "version")
    .option("language", {
    alias: "l",
    type: "string",
    default: "english",
    describe: "Language of card.",
})
    .version()
    .help()
    .argv;
//# sourceMappingURL=cli.js.map