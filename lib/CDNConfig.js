"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CDN {
    constructor(config) {
        if (config) {
            this.set(config);
        }
    }
    /**
     * Set the config properties.
     *
     * @param {Required<CDNResponse>} {cdn_root, url, expire_time}
     * @returns this
     * @memberof CDNConfig
     */
    set({ cdn_root, url, expire_time, setId }) {
        Object.assign(this, { cdnRoot: cdn_root, url, expireTime: expire_time, setId });
        return this;
    }
    /**
     * get the full path to a set.
     *
     * @readonly
     * @type {string}
     * @memberof CDNConfig
     */
    get fullURL() {
        if (!this.isValid) {
            return "";
        }
        return this.cdnRoot + this.url;
    }
    /**
     * Checks if this config is valid.
     *
     * @readonly
     * @type {boolean}
     * @memberof CDNConfig
     */
    get isValid() {
        const { cdnRoot, url, expireTime } = this;
        console.log(this);
        return (cdnRoot !== undefined && url !== undefined && expireTime !== undefined);
    }
}
exports.default = CDN;
//# sourceMappingURL=CDNConfig.js.map