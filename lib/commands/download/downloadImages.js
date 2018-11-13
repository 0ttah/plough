"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const CardImage_1 = __importDefault(require("../../CardImage"));
async function downloadAllCardsImages(cards, filePath) {
    const promises = cards.map(async (card) => downloadCardImages(card, filePath));
    return Promise
        .all(promises)
        .then((res) => {
        console.log(colors_1.default.bold.green("Downloaded all images to " + filePath));
        return res;
    });
}
exports.downloadAllCardsImages = downloadAllCardsImages;
async function downloadCardImages(card, folderPath) {
    const cardFolderPath = folderPath + "/" + card.card_id;
    const images = [
        new CardImage_1.default("mini", ".png", card.mini_image.default),
        new CardImage_1.default("large", ".png", card.large_image.default),
        new CardImage_1.default("ingame", ".png", card.ingame_image.default),
    ];
    return Promise.all(images.map(async (img) => img.download(cardFolderPath))).then((res) => {
        console.log(colors_1.default.bgGreen(`${card.card_name.english} (${card.card_id})` + " downloaded"));
    });
}
exports.downloadCardImages = downloadCardImages;
//# sourceMappingURL=downloadImages.js.map