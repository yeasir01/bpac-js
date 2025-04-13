export type TemplateData = {
    [key:string] : string | Date
};

export type Constructor = {
    templatePath: string;
    exportDir?: string;
    printer?: string;
};

export type PrintOptions = {
    copies?: number;
    printName?: string;
};

export enum PrintOptionFlag {
    autoCut = 0x1,
    cutPause = 0x1,
    cutMark = 0x2,
    halfCut = 0x200,
    chainPrint = 0x400,
    tailCut = 0x800,
    specialTape = 0x00080000,
    cutAtEnd = 0x04000000,
    noCut = 0x10000000,
    mirroring = 0x4,
    quality = 0x00010000,
    highSpeed = 0x01000000,
    highResolution = 0x02000000,
    color = 0x8,
    mono = 0x10000000,
}

export type StartPrintOptions = {
    [key in keyof typeof PrintOptionFlag]?: boolean;
};

export type FitPage = {
    fitPage?: boolean;
};

export type PrintConfig = PrintOptions & StartPrintOptions & FitPage;

export type ImageOptions = {
    width?: number;
    height?:number;
};

export enum ObjectTypes {
    Text = 0,
    Barcode = 1,
    Image = 2,
    DateTime = 3,
    ClipArt = 4,
}

export interface PrinterStatus {
    printerName: string | null;
    online: boolean | null;
    supported: boolean | null;
    errorCode: number | null;
    errorString: string | null;
    currentMedia: string[] | null;
    supportedMedia: string[] | null;
}

export enum ExportType {
    ".lbx" = 0x1,
    ".lbl" = 0x2,
    ".lbi" = 0x3,
    ".bmp" = 0x4,
    ".paf" = 0x5,
}
