import { PrinterOptions, Encoding } from "./types";

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

export const getPrintOption = (option?:PrinterOptions): number => {
    switch (option) {
        case PrinterOptions.Default:
            return 0x0;
        case PrinterOptions.AutoCut:
        case PrinterOptions.CutPause:
            return 0x1;
        case PrinterOptions.CutMark:
            return 0x2;
        case PrinterOptions.HalfCut:
            return 0x200;
        case PrinterOptions.ChainPrint:
            return 0x400;
        case PrinterOptions.TailCut:
            return 0x800;
        case PrinterOptions.SpecialTape:
            return 0x00080000;
        case PrinterOptions.CutAtEnd:
            return 0x04000000;
        case PrinterOptions.NoCut:
            return 0x10000000;
        case PrinterOptions.Mirroring:
            return 0x4;
        case PrinterOptions.Quality:
            return 0x00010000;
        case PrinterOptions.HighSpeed:
            return 0x01000000;
        case PrinterOptions.HighResolution:
            return 0x02000000;
        case PrinterOptions.Color:
        case PrinterOptions.Mono:
            return 0x8;
        case PrinterOptions.Continue:
            return 0x40000000;
        default:
            return 0x0;
    }
};

export const getEncodingOption = (fileType?:Encoding) => {
    switch (fileType) {
        case Encoding.Default:
            return 0x0;
        case Encoding.Lbx:
            return 0x1;
        case Encoding.Lbl:
            return 0x2;
        case Encoding.Lbi:
            return 0x3;
        case Encoding.Bmp:
            return 0x4;
        case Encoding.Paf:
            return 0x5;
        default:
            throw new Error(`Invalid encoding. Received ${fileType}.`);
    }
};
