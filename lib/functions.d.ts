import { AxiosInstance } from "axios";
import { CardAPIObject } from "./CardSetInterfaces";
import CDN from "./CDN";
export declare function getSetCDN(api: AxiosInstance, id: number): Promise<CDN>;
export declare function getSetJSON(cdn: CDN): Promise<CardAPIObject>;
export declare function saveSet(set: CardAPIObject, filePath: string, getImages?: boolean): Promise<boolean>;
export declare function createCardMap(filePath: string, set: CardAPIObject): void;
export declare function downloadImages(): Promise<void>;
/**
 * Transforms JSON response to an object.
 *
 * @param {string} data
 * @returns {Promise<object>}
 */
export declare function transformToJSON(data: string): Promise<object>;
export declare function removeFolder(filePath: string): void;
//# sourceMappingURL=functions.d.ts.map