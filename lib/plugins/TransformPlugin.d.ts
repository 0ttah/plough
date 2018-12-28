import { Card, CardAPIObject } from "@open-artifact/api-types";
export declare abstract class TransformPlugin {
    name: string;
    abstract transformSet(set: CardAPIObject): any;
    abstract transformFragment(fragment: Card): any;
}
//# sourceMappingURL=TransformPlugin.d.ts.map