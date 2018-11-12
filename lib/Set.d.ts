export interface Name {
    english: string;
}
export interface SetInfo {
    set_id: number;
    pack_item_def: number;
    name: Name;
}
export interface CardName {
    english: string;
}
export interface CardText {
    english: string;
}
export interface MiniImage {
    default: string;
}
export interface LargeImage {
    default: string;
}
export interface IngameImage {
    default: string;
}
export interface Reference {
    card_id: number;
    ref_type: string;
    count: number;
}
export interface CardList {
    card_id: number;
    base_card_id: number;
    card_type: string;
    card_name: CardName;
    card_text: CardText;
    mini_image: MiniImage;
    large_image: LargeImage;
    ingame_image: IngameImage;
    hit_points: number;
    references: Reference[];
    illustrator: string;
    mana_cost?: number;
    attack?: number;
    is_black?: boolean;
    sub_type: string;
    gold_cost?: number;
    is_green?: boolean;
    is_red?: boolean;
    armor?: number;
    is_blue?: boolean;
}
export interface CardSet {
    version: number;
    set_info: SetInfo;
    card_list: CardList[];
}
export interface RootObject {
    card_set: CardSet;
}
//# sourceMappingURL=Set.d.ts.map