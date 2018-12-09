export interface TransformPlugin {
  transformSet(set: any): any;
  transformCard(card: any): any;
}
