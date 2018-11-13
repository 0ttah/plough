import axios, { AxiosInstance } from "axios";
import colors from "colors";
import fs from "fs";
import emoji from "node-emoji";
import path from "path";
import shell from "shelljs";
import { CardFileMap, CardFileMapEntry } from "./CardFileMap/";
import CardImage from "./CardImage";
import { Card, CardAPIObject, CardSet } from "./CardSetInterfaces";
import CDN, { CDNResponse } from "./CDN";
import { fragmentCard } from "./fragmentCards";
import SaveSetOptions from "./SaveSetOptions";
import writeFile from "./writeFile";

// Get set CDN
export async function getSetCDN(api: AxiosInstance, id: number): Promise<CDN> {
  const url = `/${id}/`;
  if (id < 0) {
    throw new Error("Set numbers cannot be below 0");
  }
  return api.get(url).then((response) => {
    return response.data;
  }).then((data) => {
    return new CDN({ ...data, setId: id });
  });
}

// get set json
export async function getSetJSON(cdn: CDN): Promise<CardAPIObject> {
  console.log("Retrieving set " + cdn.setId, cdn.fullURL);
  return axios
    .get(cdn.fullURL, {
      transformResponse: [transformToJSON],
    })
    .then((response) => response.data);
}

export async function saveSet(set: CardAPIObject, filePath: string, options: SaveSetOptions = new SaveSetOptions()) {
  // Make folder for set
  const setId = set.card_set.set_info.set_id;
  const setFolderPath = path.normalize(`${filePath}/sets/set-${setId}`);
  const setFilePath = path.normalize(`${setFolderPath}/set.json`);
  shell.mkdir("-p", setFolderPath);

  // save set & card map files
  const writeSetFile = writeFile(setFilePath, JSON.stringify(set, undefined, 2), null, () => {
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
    const downloadImageJob = downloadAllCardsImages(set.card_set.card_list, cardPath);
    jobs = [...jobs, downloadImageJob];
  }
  if (options.fragmentCards) {
    // Fragment cards
    const fragmentCardsJob = set.card_set.card_list.map(async (card) => fragmentCard(card, setFolderPath + "/cards", true));
    jobs = [...jobs, ...fragmentCardsJob];
  }
  // save fragments
  console.log(colors.blue(setId + ":"), colors.bold.magenta("Waiting for jobs to complete."));
  return Promise
    .all(jobs)
    .then((res) => {
      console.log(colors.blue(setId + ":"), "All jobs completed!");
      return res;
    });
}

function makeCardFolders(folderPath: string, ids: number[]) {
  // create folder for each card id
  console.log("Creating card fragment folders");
  ids.map(async (id) => shell.mkdir(folderPath + "/" + id));
  console.log("Card fragment folders created");
}

export async function downloadAllCardsImages(cards: Card[], filePath: string) {
  const promises = cards.map(async (card) => downloadCardImages(card, filePath));

  return Promise
    .all(promises)
    .then((res) => {
      console.log(colors.bold.green("Downloaded all images to " + filePath));
      return res;
    });
}

export async function downloadCardImages(card: Card, folderPath: string) {
  const cardFolderPath = folderPath + "/" + card.card_id;
  const images: CardImage[] = [
    new CardImage("mini", ".png", card.mini_image.default),
    new CardImage("large", ".png", card.large_image.default),
    new CardImage("ingame", ".png", card.ingame_image.default),
  ];

  return Promise.all(images.map(async (img) => img.download(cardFolderPath))).then((res) => {
    console.log(colors.bgGreen(`${card.card_name.english} (${card.card_id})` + " downloaded"));
  });
}

/**
 * Transforms JSON response to an object.
 *
 * @param {string} data
 * @returns {Promise<object>}
 */
export function transformToJSON(data: string): Promise<object> {
  return JSON.parse(data);
}

export function removeFolder(filePath: string) {
  if (filePath !== "/") {
    shell.rm("-rf", filePath);
  }
}
