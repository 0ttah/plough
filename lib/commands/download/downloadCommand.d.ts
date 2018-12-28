import yargs from "yargs";
export declare const command: string[];
export declare const desc = "Download card sets";
export declare const example = "HELLO";
export declare const builder: {
    output: {
        alias: string;
        default: string;
        describe: string;
        type: string;
    };
    pictures: {
        alias: string;
        default: boolean;
        describe: string;
        type: string;
    };
    sets: {
        alias: string;
        array: boolean;
        default: number[];
        describe: string;
    };
    redownload: {
        default: boolean;
        describe: string;
        alias: string;
        type: string;
    };
    fragment: {
        default: boolean;
        describe: string;
        alias: string;
        type: string;
    };
    wipe: {
        default: boolean;
        describe: string;
    };
    transform: {
        alias: string;
        type: string;
        default: boolean;
        describe: string;
    };
    language: {
        alias: string;
        type: string;
        default: string;
        describe: string;
    };
};
export declare function handler(argv: yargs.Arguments): Promise<void>;
//# sourceMappingURL=downloadCommand.d.ts.map