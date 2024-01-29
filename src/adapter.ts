import * as bpac from "./vendor/bpac-v3.4";
import { Data, ObjectTypes } from "./types";

const doc = bpac.IDocument;

export const openTemplate = async (path: string): Promise<boolean> => {
    const isOpen:boolean = await doc.Open(path);

    if (!isOpen) {
        throw new Error(
            "Failed to open template file, please check path and try again.",
        );
    }

    return true;
};

export const closeTemplate = async (): Promise<boolean> => {
    const isClosed = await doc.Close();

    if (!isClosed) {
        throw new Error("Failed to close template file.");
    }

    return true;
};

export const startPrint = async (printName:string, bitmask:number): Promise<boolean> => {
    const isStarted:boolean = await doc.StartPrint(printName, bitmask);

    if (!isStarted) {
        await closeTemplate();
        throw new Error("Failed to start the print process.");
    }

    return true;
};

export const printOut = async (copies: number): Promise<boolean> => {
    const isPrinted:boolean = await doc.PrintOut(copies, 0);

    if (!isPrinted) {
        await closeTemplate();
        throw new Error("Failed to print.");
    }

    return true;
};

export const endPrint = async () => {
    const hasEnded:boolean = await doc.EndPrint();

    if (!hasEnded) {
        await closeTemplate();
        throw new Error("Failed to end print process.");
    }

    return true;
};

export const imageData = async (width:number, height:number): Promise<string> => {
    const data = await doc.GetImageData(4, width, height);
    return data;
};

export const getPrinterName = async (): Promise<string> => {
    const printerName: string = await doc.GetPrinterName();
    return printerName;
};

export const getPrinters = async (): Promise<string[]> => {
    const obj = await doc.GetPrinter();
    const printers = await obj.GetInstalledPrinters();
    return printers;
};

export const exportTemplate = async (type:number, dest:string, res:number): Promise<boolean> => {
    const isExported:boolean = await doc.Export(type, dest, res);

    if (!isExported) {
        await closeTemplate();
        throw new Error(`Failed to export file to ${dest}.`);
    }

    return true;
};

export const populateObjectsInTemplate = async (data: Data): Promise<boolean> => {
    const keys: string[] = Object.keys(data);

    // eslint-disable-next-line no-restricted-syntax
    for (const prop of keys) {
        const value = data[prop];
        const obj = await doc.GetObject(prop);

        if (!obj) {
            await closeTemplate();
            throw new Error(
                `There is no object in the specified template with the name of "${prop}".`,
            );
        }

        const type = await obj.Type;

        switch (type) {
            case ObjectTypes.Text:
                obj.Text = value;
                break;
            case ObjectTypes.Image:
                await obj.SetData(0, value, 4);
                break;
            case ObjectTypes.DateTime:
                await obj.SetData(0, value);
                break;
            case ObjectTypes.Barcode:
                await doc.SetBarcodeData(0, value);
                break;
            case ObjectTypes.ClipArt:
                await obj.SetData(0, value, 0);
                break;
            default:
                throw new Error(`Unknown type for "${prop}" prop.`);
        }
    }

    return true;
};
