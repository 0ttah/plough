import CardFileMapEntry from "./CardFileMapEntry";

export default class CardFileMap {
  public entries: CardFileMapEntry[] = [];
  constructor(entries?: CardFileMapEntry[]) {
    this.entries = entries || [];
  }
  public add(entry: CardFileMapEntry | CardFileMapEntry[]) {
    this.entries.concat(entry);
    return this;
  }
}
