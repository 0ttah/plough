"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const CardImage_1 = __importDefault(require("../../CardImage"));
// Download each card's images
async function downloadAllCardsImages(cards, filePath, languageOption = "default") {
    const promises = cards.map(async (card) => downloadCardImages(card, filePath, languageOption));
    return Promise
        .all(promises)
        .then((res) => {
        console.log(colors_1.default.bold.green("Downloaded all images to " + filePath));
        return res;
    });
}
exports.downloadAllCardsImages = downloadAllCardsImages;
// Download all the images for a card
async function downloadCardImages(card, folderPath, languageOption = "default") {
    const cardFolderPath = folderPath + "/" + card.card_id;
    let images = [
        new CardImage_1.default("mini", ".png", card.mini_image.default),
        new CardImage_1.default("large", ".png", card.large_image[languageOption]),
    ];
    if (card.card_type === "Hero") {
        images = images.concat(new CardImage_1.default("ingame", ".png", card.ingame_image.default));
    }
    return Promise.all(images.map(async (img) => img.download(cardFolderPath))).then((res) => {
        console.log(colors_1.default.bgGreen(`${card.card_name.english} (${card.card_id}) downloaded | language: ${languageOption}`));
    });
}
exports.downloadCardImages = downloadCardImages;
//# sourceMappingURL=downloadImages.js.map