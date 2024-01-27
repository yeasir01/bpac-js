import { StartPrintOptions } from "./types";

const optionBitmaskMap: { [key in keyof StartPrintOptions]: number } = {
    autoCut: 0x1,
    cutPause: 0x1,
    cutMark: 0x2,
    halfCut: 0x200,
    chainPrint: 0x400,
    tailCut: 0x800,
    specialTape: 0x00080000,
    cutAtEnd: 0x04000000,
    noCut: 0x10000000,
    mirroring: 0x4,
    quality: 0x00010000,
    highSpeed: 0x01000000,
    highResolution: 0x02000000,
    color: 0x8,
    mono: 0x10000000,
    continue: 0x40000000,
};

export const getAbsolutePath = (basePath: string, filePathOrFileName: string): string => {
    // eslint-disable-next-line no-useless-escape
    const isPath = /^(.*[\\\/])([^\\\/]+)\.([^.]+)$/;

    if (!isPath.test(filePathOrFileName)) {
        if (!basePath) {
            throw Error("Please set exportDir or provide the full path.");
        }
        return basePath + filePathOrFileName;
    }

    return filePathOrFileName;
};

export const getExportType = (fileExt:string) => {
    switch (fileExt) {
        case ".lbx":
            return 0x1;
        case ".lbl":
            return 0x2;
        case ".lbi":
            return 0x3;
        case ".bmp":
            return 0x4;
        case ".paf":
            return 0x5;
        default:
            throw new Error(`Invalid extension: Expected ".lbx | .lbl | .lbi | .bmp | .paf", received ${fileExt}.`);
    }
};

export const getStartPrintOptions = (options: StartPrintOptions): number => {
    const combinedBitmask: number[] = [];

    Object.entries(options).forEach(([key, value]) => {
        const k = key as keyof StartPrintOptions;

        if (value === true && optionBitmaskMap[k] !== undefined) {
            const bitmaskValue: number | undefined = optionBitmaskMap[k];

            if (bitmaskValue !== undefined) {
                combinedBitmask.push(bitmaskValue);
            }
        }
    });

    // eslint-disable-next-line no-bitwise
    return combinedBitmask.reduce((acc, val) => acc | val, 0x0);
};

export const getFileExtension = (filePathOrFileName:string): string => {
    const lastDotIdx:number = filePathOrFileName.lastIndexOf(".");

    if (lastDotIdx === -1) {
        throw new Error(`No extension provided for file: ${filePathOrFileName}`);
    }

    const extension:string = filePathOrFileName.slice(lastDotIdx);
    const normalizedExt:string = extension.toLowerCase();

    return normalizedExt;
};
