export default class ImageData {
    name: string;
    url: string;
    ext: string;
    constructor(name: string, ext: string, url: string);
    readonly isValid: boolean;
    download(folderPath: string): Promise<false | import("axios").AxiosResponse<any>>;
}
//# sourceMappingURL=CardImage.d.ts.map