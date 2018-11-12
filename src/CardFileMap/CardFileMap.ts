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
}
