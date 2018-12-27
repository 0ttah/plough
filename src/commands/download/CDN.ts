export default class CDN {
  public cdnRoot!: string;
  public url!: string;
  public expireTime!: number;
  public setId!: number;

  constructor(config?: Required<CDNResponse>) {
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
  public set({cdn_root, url, expire_time, setId}: Required<CDNResponse>) {
    Object.assign(this, {cdnRoot: cdn_root, url, expireTime: expire_time, setId});
    return this;
  }

  /**
   * get the full path to a set.
   *
   * @readonly
   * @type {string}
   * @memberof CDNConfig
   */
  get fullURL(): string {
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
  get isValid(): boolean {
    const {cdnRoot, url, expireTime} = this;
    return(cdnRoot !== undefined && url !== undefined && expireTime !== undefined);
  }
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
