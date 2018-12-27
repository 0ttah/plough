import { Card, LanguageOptionLargeImage } from "@open-artifact/api-types";
import colors from "colors";
import CardImage from "../../CardImage";

// Download each card's images
export async function downloadAllCardsImages(cards: Card[], filePath: string, languageOption: keyof LanguageOptionLargeImage = "default") {
  const promises = cards.map(async (card) => downloadCardImages(card, filePath, languageOption));

  return Promise
    .all(promises)
    .then((res) => {
      console.log(colors.bold.green("Downloaded all images to " + filePath));
      return res;
    });
}

// Download all the images for a card
export async function downloadCardImages(card: Card, folderPath: string, languageOption: keyof LanguageOptionLargeImage = "default") {
  const cardFolderPath = folderPath + "/" + card.card_id;
  let images: CardImage[] = [
    new CardImage("mini", ".png", card.mini_image.default),
    new CardImage("large", ".png", card.large_image[languageOption]),
  ];
  console.log(colors.bgRed("URL " + card.large_image[languageOption]));
  if (card.card_type === "Hero") {
    images = images.concat(new CardImage("ingame", ".png", card.ingame_image.default));
  }

  return Promise.all(images.map(async (img) => img.download(cardFolderPath))).then((res) => {
    console.log(colors.bgGreen(`${card.card_name.english} (${card.card_id}) downloaded | language: ${languageOption}`));
  });
}
