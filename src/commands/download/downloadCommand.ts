import axios from "axios";
import colors from "colors";
import { emoji } from "node-emoji";
import path from "path";
import yargs from "yargs";
import { TransformPlugin } from "../../plugins/TransformPlugin";
import { removeFolder } from "../utils";
import downloadSet from "./downloadSet";
import { transformToJSON } from "./transformToJSON";

export const command = ["download", "d"];
export const desc = "Download card sets";
export const example = "HELLO";
// @TODO Switch to function form builder
export const builder = {
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

export async function handler(argv: yargs.Arguments) {
  // @TODO Find a option that limits -s to an arroy of numbers so this check can be removed.
  const valid = argv.sets.every((x: any) => typeof x === "number");
  if (!valid) {
    console.log(colors.red.bold.underline("Sets must be numbers!"));
    console.log("plough download --help");
    yargs.exitProcess(true);
  }

  const setIds: number[] = argv.s;
  const artifactAPI = axios.create({
    baseURL: "https://playartifact.com/cardset/",
    method: "get",
    transformResponse: [transformToJSON],
  });
  console.log("Ploughing", emoji.tractor);
  // Wipe folder if set
  if (argv.wipe) {
    const outputPath = argv.output;
    console.log(`Wiping: ${outputPath}`);
    removeFolder(outputPath);
  }

  let transformPlugin: TransformPlugin;
  if (argv.transform) {
    await loadPlugin(path.resolve(argv.transform))
      .then((plugin) => {
        transformPlugin = plugin;
      })
      .catch((err) => {
        process.exit(0);
      });
  }
  // Wait for sets to be downloaded
  const sets = setIds.map((id) => downloadSet(id, artifactAPI, argv, transformPlugin));

  Promise
    .all(sets)
    .then((results) => {
      const msg = "Finished ploughing";
      console.log(msg, emoji.tractor);
    },
    );

}

async function loadPlugin(pluginPath: string): Promise<TransformPlugin> {
  try {
    const plugin = await import(pluginPath);
    console.log(colors.bgGreen(`Loaded plugin ${pluginPath}`));
    return new plugin.default();
  } catch (err) {
    console.error(colors.bgRed(`Could not load plugin from ${pluginPath}`), err);
    throw new Error();
  }
}
