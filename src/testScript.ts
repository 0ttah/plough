import { Card, CardAPIObject } from "@open-artifact/api-types";
import { TransformPlugin } from "./plugins/TransformPlugin";

export default class ExampleCard extends TransformPlugin {

  public name: string = "Test";
  public transformSet(set: CardAPIObject): any {
    return {
      name: "Test",
    };
  }
  public transformFragment(fragment: Card): any {
    console.log("fragged");
    return {
      name: fragment.card_name,
    };
  }

  constructor() {
    super();
    console.log("Constructed tested");
  }
}
