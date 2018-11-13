/// <reference types="node" />
import { AxiosInstance } from "axios";
import fs from "fs";
import { CardAPIObject } from "./CardSetInterfaces";
import CDN from "./CDN";
export declare function getSetCDN(api: AxiosInstance, id: number): Promise<CDN>;
export declare function getSetJSON(cdn: CDN): Promise<CardAPIObject>;
export declare function writeFile(filePath: string, data: string, options: fs.WriteFileOptions, callback: () => void): Promise<any>;
export declare function makeCardFolders(folderPath: string, ids: number[]): void;
/**
 * Transforms JSON response to an object.
 *
 * @param {string} data
 * @returns {Promise<object>}
 */
export declare function transformToJSON(data: string): Promise<object>;
export declare function removeFolder(filePath: string): void;
//# sourceMappingURL=functions.d.ts.map