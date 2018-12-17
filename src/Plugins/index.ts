export class TransformPlugin {
  public transformSet(set: any): any {
    throw new Error("Not implemented");
  }
  public transformFragment(fragment: any): any {
    throw new Error("Not implemented");
  }
  constructor() {
    console.log("Constructed");
  }
}
