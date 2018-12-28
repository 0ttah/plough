import { AxiosInstance } from "axios";
import colors from "colors";
import yargs = require("yargs");
import { TransformPlugin } from "../../plugins";
import { getSetCDN } from "./getSetCDN";
import { getSetJSON } from "./getSetJSON";
import saveSet from "./saveSet";
import SaveSetOptions from "./SaveSetOptions";

export default async function downloadSet(setId: number, api: AxiosInstance, argv: yargs.Arguments, transformPlugin: TransformPlugin) {
  const outputPath = argv.output;
  const options = new SaveSetOptions({ language: argv.language, downloadImages: argv.p, redownloadImages: argv.r, fragmentCards: argv.f, transformPlugin, log: argv.l }); // @TODO fix logging argv.l is language not log
  // Make request for sets
  return await getSetCDN(api, setId)
    .then((cdn) => {
      return getSetJSON(cdn)
        .then((set) => saveSet(set, outputPath, options))
        .then((value) => {
          console.log(colors.blue(setId + ":"), `Success! Set #${setId} downloaded.`);
          return value;
        })
        .catch((err) => {
          console.log("Error getting set " + cdn.setId, err);
          return false;
        });
    })
    .catch((err) => false);
}
