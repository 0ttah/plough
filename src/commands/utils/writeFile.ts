import fs from "fs";
export function writeFile(filePath: string, data: string, options: fs.WriteFileOptions, successCallback?: () => void): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, options, (err) => {
      if (err) {
        reject(false);
      }
      if (successCallback) {
        successCallback();
      }
      resolve(true);
    });
  });
}
