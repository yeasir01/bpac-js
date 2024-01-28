import * as bpac from "./vendor/bpac-v3.4";
import { Data, ObjectTypes } from "./types";

const doc = bpac.IDocument;

export const openTemplate = async (path: string): Promise<boolean> => {
    const isOpen = await doc.Open(path);

    if (isOpen) {
        return true;
    }

    throw new Error(
        "Failed to open template file, please check path and try again.",
    );
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

export const startPrint = async (printName:string, bitmask:number): Promise<boolean> => {
    const isComplete = await doc.StartPrint(printName, bitmask);
    return isComplete;
};

export const printOut = async (copies: number): Promise<boolean> => {
    const isComplete = await doc.PrintOut(copies, 0);
    return isComplete;
};

export const endPrint = async () => {
    const isComplete = await doc.EndPrint();
    return isComplete;
};

export const imageData = async (width:number, height:number): Promise<string> => {
    const data = await doc.GetImageData(4, width, height);
    return data;
};

export const closeTemplate = async (): Promise<boolean> => {
    const isClosed = await doc.Close();

    if (isClosed) {
        return true;
    }

    throw new Error("Failed to close template file.");
};

export const exportTemplate = async (
    type:number,
    destination:string,
    resolution:number,
): Promise<boolean> => {
    const isComplete = await doc.Export(type, destination, resolution);
    return isComplete;
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
