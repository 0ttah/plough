import colors from "colors";
import CardImage from "../../CardImage";
import { Card } from "../../CardSetInterfaces";

export async function downloadAllCardsImages(cards: Card[], filePath: string) {
  const promises = cards.map(async (card) => downloadCardImages(card, filePath));

  return Promise
    .all(promises)
    .then((res) => {
      console.log(colors.bold.green("Downloaded all images to " + filePath));
      return res;
    });
}

export async function downloadCardImages(card: Card, folderPath: string) {
  const cardFolderPath = folderPath + "/" + card.card_id;
  const images: CardImage[] = [
    new CardImage("mini", ".png", card.mini_image.default),
    new CardImage("large", ".png", card.large_image.default),
    new CardImage("ingame", ".png", card.ingame_image.default),
  ];

  return Promise.all(images.map(async (img) => img.download(cardFolderPath))).then((res) => {
    console.log(colors.bgGreen(`${card.card_name.english} (${card.card_id})` + " downloaded"));
  });
}
