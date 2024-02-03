import * as bpac from "./vendor/bpac-v3.4";
import { Data, ObjectTypes } from "./types";

const Doc = bpac.IDocument;

export const openTemplate = async (path: string): Promise<void> => {
    const isOpen:boolean = await Doc.Open(path);

    if (!isOpen) {
        throw new Error("Failed to open the template file.");
    }
};

export const setPrinter = async (printer: string | undefined, fitPage: boolean): Promise<void> => {
    if (printer === undefined && fitPage === false) return;

    if (printer === undefined && fitPage === true) {
        throw new Error("To use fitPage, you must explicity set the printer name.");
    }

    const isPrinter:boolean = await Doc.SetPrinter(printer, fitPage);

    if (!isPrinter) {
        throw new Error(
            `Failed to set the printer. The specified printer "${printer}" may not exist or is not accessible.`,
        );
    }
};

export const closeTemplate = async (): Promise<boolean> => {
    const isClosed = await Doc.Close();

    if (!isClosed) {
        throw new Error("Failed to close template file.");
    }

    return true;
};

export const startPrint = async (printName:string, bitmask:number): Promise<boolean> => {
    const isStarted:boolean = await Doc.StartPrint(printName, bitmask);

    if (!isStarted) {
        await closeTemplate();
        throw new Error("Failed to start the print process.");
    }

    return true;
};

export const printOut = async (copies: number): Promise<boolean> => {
    const isPrinted:boolean = await Doc.PrintOut(copies, 0);

    if (!isPrinted) {
        await closeTemplate();
        throw new Error("Failed to print, please verify the printer name is correct for the template.");
    }

    return true;
};

export const endPrint = async () => {
    const hasEnded:boolean = await Doc.EndPrint();

    if (!hasEnded) {
        await closeTemplate();
        throw new Error("Failed to end print process.");
    }

    return true;
};

export const imageData = async (width:number, height:number): Promise<string> => {
    const data = await Doc.GetImageData(4, width, height);
    return data;
};

export const getPrinterName = async (): Promise<string> => {
    const printerName: string = await Doc.GetPrinterName();
    return printerName;
};

export const getPrinters = async (): Promise<string[]> => {
    const obj = await Doc.GetPrinter();
    const printers = await obj.GetInstalledPrinters();
    return printers;
};

export const exportTemplate = async (type:number, dest:string, res:number): Promise<boolean> => {
    const isExported:boolean = await Doc.Export(type, dest, res);

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
        const obj = await Doc.GetObject(prop);

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
                await Doc.SetBarcodeData(0, value);
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
