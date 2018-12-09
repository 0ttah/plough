import { TransformPlugin } from "./Plugins";

class ArtifactDBTransform implements TransformPlugin {
  public transformSet(set: any) {
    throw new Error("Method not implemented.");
  }
  public transformCard(card: any) {
    const newCard = {
      name: card.card_name,
    };
    console.log("Modifying card", card.card_name);
    return newCard;
  }

}
