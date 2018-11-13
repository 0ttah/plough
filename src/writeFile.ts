import fs from "fs";

export default function writeFile(filePath: string, data: string, options: fs.WriteFileOptions, callback: () => void): Promise<any> {
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
