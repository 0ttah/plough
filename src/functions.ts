import fs from "fs";
import shell from "shelljs";

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

export function removeFolder(filePath: string) {
  if (filePath !== "/") {
    shell.rm("-rf", filePath);
  }
}
