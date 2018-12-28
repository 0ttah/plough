import { Card, LanguageOptionLargeImage } from "@open-artifact/api-types";
export declare function downloadAllCardsImages(cards: Card[], filePath: string, languageOption?: keyof LanguageOptionLargeImage): Promise<void[]>;
export declare function downloadCardImages(card: Card, folderPath: string, languageOption?: keyof LanguageOptionLargeImage): Promise<void>;
//# sourceMappingURL=downloadImages.d.ts.map