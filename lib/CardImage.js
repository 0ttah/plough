"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class ImageData {
    constructor(name, ext, url) {
        this.name = name;
        this.url = url;
        this.ext = ext;
    }
    get isValid() {
        return this.name !== undefined && this.url !== undefined;
    }
    async download(folderPath) {
        if (!this.isValid) {
            return false;
        }
        const filePath = folderPath + "/" + this.name + this.ext;
        if (!fs_1.default.existsSync(filePath)) {
            return axios_1.default({
                method: "get",
                url: this.url,
                responseType: "stream",
            })
                .then(async (response) => {
                await writeImage(response.data, filePath);
                // console.log(colors.magenta.bgBlack.italic(`- Downloaded ${filePath}`));
                return response;
            });
        }
        else {
            return false;
        }
    }
}
exports.default = ImageData;
function writeImage(data, filePath) {
    return new Promise((resolve) => {
        data.pipe(fs_1.default.createWriteStream(filePath)
            .on("finish", () => {
            resolve();
        }));
    });
}
//# sourceMappingURL=CardImage.js.map