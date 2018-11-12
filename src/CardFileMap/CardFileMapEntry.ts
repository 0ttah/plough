export default class CardFileMapEntry {
  public cardName!: string;
  public cardId!: number;
  constructor(cardName: string, cardId: number) {
    Object.assign(this, { cardName, cardId });
  }

  get fileName(): string {
    const fileName = this.cardName
      .replace(/ /g, "_")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/!/g, "")
      .toLowerCase();

    return fileName;
  }
}
