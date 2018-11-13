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

export function writeFile(filePath: string, data: string, options: fs.WriteFileOptions, callback: () => void): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (err) => {
      if (err) {
        reject(false);
      }
      callback();
      resolve(true);
    });
  });
}

export function makeCardFolders(folderPath: string, ids: number[]) {
  // create folder for each card id
  console.log("Creating card fragment folders");
  ids.map(async (id) => shell.mkdir(folderPath + "/" + id));
  console.log("Card fragment folders created");
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
