import { AxiosInstance } from "axios";
import colors from "colors";
import yargs = require("yargs");
import { getSetCDN, getSetJSON } from "../../functions";
import SaveSetOptions from "../../SaveSetOptions";
import saveSet from "./saveSet";

export default async function downloadSet(setId: number, api: AxiosInstance, argv: yargs.Arguments) {
  const outputPath = argv.output;
  const options = new SaveSetOptions({ downloadImages: argv.p, redownloadImages: argv.r, fragmentCards: argv.f, log: argv.l });
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
