import fs from "fs";
import path from "path";
import { Card } from "./CardSetInterfaces";

export async function fragmentCard(card: Card, setPathFolder: string) {
  const json: string = JSON.stringify(card, undefined, 2);
  const filePath = path.normalize(setPathFolder + "/" + card.card_id + "/" + "card.json");
  return await fs.writeFile(filePath, json, null, (err) => {
    if (err) {
      throw new Error("Unable to write fragment " + card.card_name.english + " to " + filePath);
    }
    console.log(`Saved card fragment ${card.card_name}`);
    return;
  });
}
