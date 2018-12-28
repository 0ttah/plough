import { CardAPIObject } from "@open-artifact/api-types";
import CardFileMapEntry from "./CardFileMapEntry";
export default class CardFileMap {
    entries: CardFileMapEntry[];
    constructor(entries?: CardFileMapEntry[]);
    add(entry: CardFileMapEntry | CardFileMapEntry[]): this;
    static createMap(set: CardAPIObject): CardFileMap;
}
//# sourceMappingURL=CardFileMap.d.ts.map