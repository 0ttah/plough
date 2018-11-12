export default class CardFileMapEntry {
  public cardName!: string;
  public cardId!: number;
  public cardType!: string;
  constructor(cardName: string, cardId: number, cardType: string) {
    Object.assign(this, { cardName, cardId, cardType });
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
