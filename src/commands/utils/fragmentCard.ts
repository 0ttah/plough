import { Card } from "@open-artifact/api-types";
import path from "path";
import { TransformPlugin } from "../../plugins/TransformPlugin";
import { writeFile } from "./writeFile";

export async function fragmentCard(card: Card, setPathFolder: string, transformPlugin?: TransformPlugin) {
  let fragment = card;
  if (transformPlugin) {
    console.log("Hello");
    fragment = transformPlugin.transformFragment(card);
  }
  const json: string = JSON.stringify(fragment, undefined, 2);
  const filePath = path.normalize(setPathFolder + "/" + card.card_id + "/" + "card.json");

  return await writeFile(filePath, json, {
    encoding: "utf8",
  }, () => { return; });
}
