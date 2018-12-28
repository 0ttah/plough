import { CardAPIObject, LanguageOptionLargeImage } from "@open-artifact/api-types";
import colors from "colors";
import path from "path";
import shell from "shelljs";
import { CardFileMap } from "../../CardFileMap";
import { fragmentCard, makeCardFolders, writeFile } from "../utils";
import { downloadAllCardsImages } from "./downloadImages";
import SaveSetOptions from "./SaveSetOptions";

export default async function saveSet(set: CardAPIObject, filePath: string, options: SaveSetOptions = new SaveSetOptions()): Promise<boolean> {
  // Make folder for set
  const setId = set.card_set.set_info.set_id;
  const setFolderPath = path.normalize(`${filePath}/sets/set-${setId}`);
  const setFilePath = path.normalize(`${setFolderPath}/set.json`);
  shell.mkdir("-p", setFolderPath);
  // save set & card map files
  const outputSet = options.transformPlugin ? options.transformPlugin.transformSet(set) : set;
  const writeSetFile = writeFile(setFilePath, JSON.stringify(outputSet, undefined, 2), null, () => {
    console.log(colors.blue(setId + ":"), "Saved set.json");
  });
  const writeFileMap = writeFile(setFolderPath + "/cardmap.json", JSON.stringify(CardFileMap.createMap(set), undefined, 2), null, () => {
    console.log(colors.blue(setId + ":"), "Card file map created.");
  });

  let jobs: Array<Promise<any>> = [writeSetFile, writeFileMap];
  // make cards folder
  if (options.downloadImages || options.fragmentCards) {
    const cardsFolderPath = path.normalize(setFolderPath + "/cards");
    shell.mkdir("-p", cardsFolderPath);
    makeCardFolders(cardsFolderPath, set.card_set.card_list.map((card) => card.card_id));
  }
  // Save images
  if (options.downloadImages) {
    // create cards folder
    const cardPath = setFolderPath + "/cards";
    const downloadImageJob = downloadAllCardsImages(set.card_set.card_list, cardPath, options.language as keyof LanguageOptionLargeImage);
    jobs = [...jobs, downloadImageJob];
  }
  if (options.fragmentCards) {
    // Fragment cards
    const fragmentCardsJob = set.card_set.card_list.map(async (card) => fragmentCard(card, setFolderPath + "/cards", options.transformPlugin));
    jobs = [...jobs, ...fragmentCardsJob];
  }

  // save fragments
  console.log(colors.blue(setId + ":"), colors.bold.magenta("Waiting for jobs to complete."));
  return Promise
    .all(jobs)
    .then(() => {
      console.log(colors.blue(setId + ":"), "All jobs completed!");
      return true;
    })
    .catch((err) => {
      console.log(colors.red(`${setId}:`), err);
      return false;
    });
}
