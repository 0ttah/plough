import axios from "axios";
import colors from "colors";
import fs from "fs";
export default class ImageData {
  public name: string;
  public url: string;
  public ext: string;

  constructor (name: string, ext: string, url: string) {
    this.name = name;
    this.url = url;
    this.ext = ext;
  }

  get isValid(): boolean {
    return this.name !== undefined && this.url !== undefined;
  }

  public async download(folderPath: string): Promise<boolean> {
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
        .then((response) => {
          response.data.pipe(fs.createWriteStream(filePath));
          console.log(colors.magenta.bgBlack.italic(`- Downloaded ${filePath}`));
          return true;
        });
    } else {
      return false;
    }
  }
}
