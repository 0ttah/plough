export default class CDN {
    cdnRoot: string;
    url: string;
    expireTime: number;
    setId: number;
    constructor(config?: Required<CDNResponse>);
    /**
     * Set the config properties.
     *
     * @param {Required<CDNResponse>} {cdn_root, url, expire_time}
     * @returns this
     * @memberof CDNConfig
     */
    set({ cdn_root, url, expire_time, setId }: Required<CDNResponse>): this;
    /**
     * get the full path to a set.
     *
     * @readonly
     * @type {string}
     * @memberof CDNConfig
     */
    readonly fullURL: string;
    /**
     * Checks if this config is valid.
     *
     * @readonly
     * @type {boolean}
     * @memberof CDNConfig
     */
    readonly isValid: boolean;
}
/**
 * JSON format of the CDN response.
 *
 * @export
 * @interface CDNResponse
 */
export interface CDNResponse {
    cdn_root: string;
    url: string;
    expire_time: number;
    setId: number;
}
//# sourceMappingURL=CDN.d.ts.map