import { Card, CardAPIObject } from "@open-artifact/api-types";
import { TransformPlugin } from "./plugins/TransformPlugin";
export default class ExampleCard extends TransformPlugin {
    name: string;
    transformSet(set: CardAPIObject): any;
    transformFragment(fragment: Card): any;
    constructor();
}
//# sourceMappingURL=testScript.d.ts.map