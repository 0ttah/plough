export declare class CardFileMap {
    entries: CardFileMapEntry[];
    constructor(entries?: CardFileMapEntry[]);
    add(entry: CardFileMapEntry | CardFileMapEntry[]): this;
}
export declare class CardFileMapEntry {
    name: string;
    cardId: number;
    constructor(model: CardFileMapEntry);
    readonly fileName: string;
}
//# sourceMappingURL=CardFileMap.d.ts.map