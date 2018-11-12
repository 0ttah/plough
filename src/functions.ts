import axios, { AxiosInstance } from "axios";
import fs from "fs";
import path from "path";
import shell from "shelljs";
import { CardFileMap, CardFileMapEntry } from "./CardFileMap/";
import { CardAPIObject, CardSet } from "./CardSetInterfaces";
import CDN, { CDNResponse } from "./CDN";

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

export async function saveSet(set: CardAPIObject, filePath: string, getImages?: boolean): Promise<boolean> {
  // Make folder for set
  const setId = set.card_set.set_info.set_id;
  const setFolderPath = path.normalize(`${filePath}/sets/set-${setId}/`);
  const setFilePath = path.normalize(`${setFolderPath}set.json`);
  shell.mkdir("-p", setFolderPath);
  // save json file
  const setJSONString = JSON.stringify(set, undefined, 2);
  fs.writeFile(setFilePath, setJSONString, (err) => {
    if (err) { throw err; }
    console.log("Saved set.json");
  });
  // save cardmap
  const cardMapJSONString = JSON.stringify(createCardMap(set), undefined, 2);
  fs.writeFile(setFolderPath + "cardmap.json", cardMapJSONString, (err) => {
    if (err) { throw err; }
    console.log("Card file map created.");
  });
  // Save images
  if (getImages) {
    // create cards folder
    shell.mkdir("-p", setFolderPath + "/cards");
  }
  // save fragments

  return true;
}

export function createCardMap(set: CardAPIObject) {
  const cardEntries = set.card_set.card_list.map<CardFileMapEntry>((card) =>
    new CardFileMapEntry(card.card_name.english, card.card_id, card.card_type));
  const cardMap = new CardFileMap().add(cardEntries);
  return cardMap;
}

export async function downloadImages() {

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
  shell.rm("-rf", filePath);
}
