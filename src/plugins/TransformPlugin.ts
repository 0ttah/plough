import { Card, CardAPIObject } from "@open-artifact/api-types";

export abstract class TransformPlugin {
  public name: string = "Base Plugin";
  // Transform the card set to new JSON format
  public abstract transformSet(set: CardAPIObject): any;
  public abstract transformFragment(fragment: Card): any;
}
