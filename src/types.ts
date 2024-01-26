export type Data = Record<string, string | Date>;

export type Config = {
    copies?: number;
    printName?: string;
    option?: PrinterOptions;
};

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

export enum Encoding {
    Default = "default",
    Lbx = "lbx",
    Lbl = "lbl",
    Lbi = "lbi",
    Bmp = "bmp",
    Paf = "paf",
}

export enum PrinterOptions {
    Default = "default",
    AutoCut = "auto-cut",
    CutPause = "cut-pause",
    CutMark = "cut-mark",
    HalfCut = "half-cut",
    ChainPrint = "chain-print",
    TailCut = "tail-cut",
    SpecialTape = "special-tape",
    CutAtEnd = "cut-at-end",
    NoCut = "no-cut",
    Mirroring = "mirror",
    Quality = "quality",
    HighSpeed = "high-speed",
    HighResolution = "high-resolution",
    Color = "color",
    Mono = "mono",
    Continue = "continue",
    Fast = "fast", // Deprecated: Use HighSpeed for faster printing.
    High = "high", // Deprecated: Use HighResolution for higher print resolution.
}
