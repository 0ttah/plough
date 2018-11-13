#!/usr/bin/env node
import axios, { AxiosInstance } from "axios";
import colors from "colors";
import { emoji } from "node-emoji";
import yargs from "yargs";
import CDN from "./CDN";
import downloadCommandHandler from "./commands/download/downloadCommandHandler";
import { getSetCDN, getSetJSON, removeFolder, saveSet, transformToJSON } from "./functions";
import SaveSetOptions from "./SaveSetOptions";
const yargv = yargs
  .command("download", "Download card set", {
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
    const sets: number[] = argv.s;
    const valid = sets.every((x) => typeof x === "number");
    if (!valid) {
      console.log(colors.red.bold.underline("Sets must be numbers!"));
      console.log("plough download --help");
      return valid;
    }
    downloadCommandHandler(argv);
  })
  .showHelpOnFail(true)
  .example("d", "plough download -p -s 0 1 -o ./artifact/assets")
  .alias("d", "download")
  .alias("h", "help")
  .alias("v", "version")
  .option("log", {
    alias: "l",
    type: "boolean",
    default: false,
    describe: "Extra logging to the console about what is occuring",
  })
  .version()
  .help()
  .argv;
