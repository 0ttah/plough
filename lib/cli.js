#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const yargv = yargs_1.default
    .commandDir("commands", { recurse: true })
    .demandCommand()
    .showHelpOnFail(true)
    .example("d", "plough download -p -s 0 1 -o ./artifact/assets")
    .alias("h", "help")
    .alias("v", "version")
    .version()
    .help()
    .argv;
//# sourceMappingURL=cli.js.map