import { CardAPIObject } from "@open-artifact/api-types";
import fs from "fs";
import CardFileMapEntry from "./CardFileMapEntry";

export default class CardFileMap {
  public entries: CardFileMapEntry[] = [];
  constructor(entries?: CardFileMapEntry[]) {
    this.entries = entries || [];
  }
  public add(entry: CardFileMapEntry | CardFileMapEntry[]) {
    this.entries = this.entries.concat(entry);
    console.log("New card map length", this.entries.length);
    return this;
  }

  public static createMap(set: CardAPIObject): CardFileMap {
    const cardEntries = set.card_set.card_list.map<CardFileMapEntry>((card) =>
      new CardFileMapEntry(card.card_name.english, card.card_id, card.card_type));
    const cardMap = new CardFileMap().add(cardEntries);
    return cardMap;
  }
}
