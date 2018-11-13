#!/usr/bin/env node --no-warnings
import axios, { AxiosInstance } from "axios";
import colors from "colors";
import yargs from "yargs";
import CDN from "./CDN";
import { getSetCDN, getSetJSON, removeFolder, saveSet, SaveSetOptions, transformToJSON } from "./functions";
console.clear();
const yargv = yargs
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
    redownload: {
      default: false,
      describe: "Redownload images if they exist on the filesystem.",
      alias: "r",
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
  .help()
  .argv;

function downloadCommandHandler(argv: yargs.Arguments): void {
  const setIds: number[] = argv.s;

  const artifactAPI = axios.create({
    baseURL: "https://playartifact.com/cardset/",
    method: "get",
    transformResponse: [transformToJSON],
  });
  setIds.map((id) => downloadSet(id, artifactAPI, argv));
}

async function downloadSet(setId: number, api: AxiosInstance, argv: yargs.Arguments): Promise<boolean> {
  console.log(argv);
  const outputPath = argv.output;
  // Wipe folder if set
  if (argv.wipe) {
    console.log(`Wiping: ${outputPath}`);
    removeFolder(outputPath);
  }
  const options = new SaveSetOptions({ downloadImages: argv.p, redownloadImages: argv.r, fragmentCards: argv.f });
  // Make request for sets
  const setUrl = await getSetCDN(api, setId)
    .then((cdn) => {
      getSetJSON(cdn)
        .then((set) => saveSet(set, outputPath, options))
        .then((value) => console.log(`Success! Set #${setId} downloaded.`))
        .catch((err) => console.log("Error getting set " + cdn.setId));
    })
    .catch((err) => console.log(err));
  return true;
}
