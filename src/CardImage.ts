import axios from "axios";
import colors from "colors";
import fs from "fs";
export default class ImageData {
  public name: string;
  public url: string;
  public ext: string;

  constructor(name: string, ext: string, url: string) {
    this.name = name;
    this.url = url;
    this.ext = ext;
  }

  get isValid(): boolean {
    return this.name !== undefined && this.url !== undefined;
  }

  public async download(folderPath: string) {
    if (!this.isValid) {
      return false;
    }
    const filePath = folderPath + "/" + this.name + this.ext;
    if (!fs.existsSync(filePath)) {
      return axios({
        method: "get",
        url: this.url,
        responseType: "stream",
      })
        .then(async (response) => {
          await writeImage(response.data, filePath);
          // console.log(colors.magenta.bgBlack.italic(`- Downloaded ${filePath}`));
          return response;
        });
    } else {
      return false;
    }
  }
}

function writeImage(data: any, filePath: string) {
  return new Promise((resolve) => {
    data.pipe(fs.createWriteStream(filePath)
      .on("finish", () => {
        resolve();
      }));
  });
}
