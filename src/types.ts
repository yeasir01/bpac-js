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

export type StartPrintOptions = {
    autoCut?: boolean;
    cutPause?: boolean,
    cutMark?: boolean,
    halfCut?: boolean,
    chainPrint?: boolean,
    tailCut?: boolean,
    specialTape?: boolean,
    cutAtEnd?: boolean,
    noCut?: boolean,
    mirroring?: boolean,
    quality?: boolean,
    highSpeed?: boolean,
    highResolution?: boolean,
    color?: boolean,
    mono?: boolean,
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
