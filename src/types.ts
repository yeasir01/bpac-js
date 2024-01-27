export type Data = Record<string, string | Date>;

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
    continue?: boolean,
};

export type PrintConfig = PrintOptions & StartPrintOptions;

export type ImageOptions = {
    width?: number;
    height?:number;
};

export enum ObjectTypes {
    Text = 0,
    Barcode = 1,
    Image = 2,
    Datetime = 3,
    Clipart = 4,
}
