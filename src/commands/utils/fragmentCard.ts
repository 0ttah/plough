import { Card } from "@open-artifact/api-types";
import path from "path";
import { writeFile } from "./writeFile";

export async function fragmentCard(card: Card, setPathFolder: string, log?: boolean) {
  const json: string = JSON.stringify(card, undefined, 2);
  const filePath = path.normalize(setPathFolder + "/" + card.card_id + "/" + "card.json");

  return await writeFile(filePath, json, {
    encoding: "utf8",
  }, () => {
    if (log) {
      console.log(`Saved card fragment ${card.card_name.english}`);
    }
  });
}
