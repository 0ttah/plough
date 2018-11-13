import axios from "axios";
import { emoji } from "node-emoji";
import yargs = require("yargs");
import { removeFolder, transformToJSON } from "../../functions";
import downloadSet from "./downloadSet";

export default function downloadCommandHandler(argv: yargs.Arguments): void {
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
  // Wait for sets to be downloaded
  const sets = setIds.map(async (id) => downloadSet(id, artifactAPI, argv));
  Promise
    .all(sets)
    .then((values) => {
      const msg = "Finished ploughing";
      console.log(msg, emoji.tractor);
    });

}
