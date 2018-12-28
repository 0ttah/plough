import fs from "fs";
import shell from "shelljs";
export function makeCardFolders(folderPath: string, ids: number[]) {
  // create folder for each card id
  console.log("Creating card fragment folders");
  ids.map(async (id) => {
    shell.mkdir("-p", folderPath + "/" + id);
  });
  console.log("Card fragment folders created");
}
