import * as bpac from "./vendor/bpac-3.4.014.js";
import { TemplateData, ObjectTypes, PrinterStatus, ExportType } from "./types.ts";
import { handleVendorError } from "./helpers.ts";

const Doc = bpac.IDocument;

export const openTemplate = async (path: string): Promise<void> => {
    if (!path || typeof path !== "string" || path.trim() === "") {
        throw new Error("Template path must be a non-empty string.");
    }

    try {
        const isOpen:boolean = await Doc.Open(path);

        if (!isOpen) {
            throw new Error(
                `Failed to open the template at ${path}. Please ensure the file exists, is accessible, and is served from the same origin to avoid CORS issues.`
            );
        }
    } catch (error: unknown) {
        handleVendorError(error, `openTemplate(path=${path})`);
    }
};

export const setPrinter = async (printerName: string | undefined, fitPage: boolean): Promise<void> => {
    try {
        if (!printerName) {
            throw new Error("Printer name is undefined.");
        }

        if (typeof fitPage !== "boolean"){
            throw new TypeError("fitPage must be a typeof Boolean");
        }

        const fitPageVariant: number = fitPage ? -1 : 0; // Convert boolean to VARIANT_BOOL

        const isSet: boolean = await Doc.SetPrinter(printerName, fitPageVariant);

        if (!isSet) {
            throw new Error("Failed to set printer.");
        }

    } catch (error) {
        await closeTemplate();
        handleVendorError(error, `setPrinter(printerName=${printerName}, fitPage=${fitPage})`);
    }
};

export const printerStatus = async (): Promise<PrinterStatus> => {
    try {
        const printer = await Doc.GetPrinter();

        if (printer) {
            const printerName = await printer.Name;

            return {
                printerName,
                online: await printer.IsPrinterOnline(printerName),
                supported: await printer.IsPrinterSupported(printerName),
                errorCode: await printer.ErrorCode,
                errorString: await printer.ErrorString,
                currentMedia: await printer.GetMediaName(),
                supportedMedia: await printer.GetSupportedMediaNames(),
            };
        }
        return {
            printerName: null,
            online: null,
            supported: null,
            errorCode: null,
            errorString: "Printer object not found.",
            currentMedia: null,
            supportedMedia: null,
        };
    } catch (error:unknown) {
        let errorMessage = "Error retrieving printer status.";

        if (error instanceof Error && error.message) {
            errorMessage += ` Details: ${error.message}`;
        }

        const errorStatus:PrinterStatus = {
            printerName: null,
            online: null,
            supported: null,
            errorCode: null,
            errorString: errorMessage,
            currentMedia: null,
            supportedMedia: null,
        };

        return errorStatus;
    }
};

export const closeTemplate = async (): Promise<void> => {
    try {
        const isClosed = await Doc.Close();

        if (!isClosed) {
            throw new Error("Failed to close the template file.");
        }
    } catch (error:unknown) {
        handleVendorError(error, "closeTemplate()")
    }
};

export const startPrint = async (printName: string, bitmask: number): Promise<void> => {
    if (typeof printName !== "string" || printName.trim() === "") {
        throw new TypeError("printName must be a non-empty string.");
    }

    if (typeof bitmask !== "number") {
        throw new TypeError("bitmask must be a number.");
    }

    try {
        const isStarted: boolean = await Doc.StartPrint(printName, bitmask);

        if (!isStarted) {
            throw new Error("Failed to start the print process.");
        }
    } catch (error: unknown) {
        await closeTemplate();
        handleVendorError(error, `startPrint(printName=${printName}, bitmask=${bitmask})`);
    }
};

export const printOut = async (copies: number): Promise<void> => {
    try {
        
        let parsed = Number(copies); // handles both numbers and numeric strings

        if (!Number.isInteger(parsed) || parsed <= 0) {
            throw new Error(
                `Failed to print: invalid "copies" value. Expected a positive integer, but received ${copies} (type: ${typeof copies}).`
            );
        }

        const isPrinted: boolean = await Doc.PrintOut(parsed, 0);

        if (!isPrinted) {
            throw new Error("Failed to print, please verify the printer name is correct for the template.");
        }

    } catch (error) {
        await closeTemplate();
        handleVendorError(error, `printOut(copies=${copies})`);
    }
};

export const endPrint = async (): Promise<void> => {
    try {
        const isEnded: boolean = await Doc.EndPrint();

        if (!isEnded) {
            throw new Error("Bpac has failed to end the print process. Attempting to close template.");
        }

    } catch (error) {
        await closeTemplate();
        handleVendorError(error, "endPrint()");
    }
};

export const imageData = async (width: number, height: number): Promise<string> => {
    try {
        const data = await Doc.GetImageData(4, width, height);

        if (data === null || data === undefined) {
            throw new Error("Doc.GetImageData returned null or undefined.");
        }

        return data.toString();
    } catch (error: unknown) {
        return handleVendorError(error, `imageData(width=${width}, height=${height})`);
    }
};

export const getPrinterName = async (): Promise<string> => {
    try {
        const printerName: string = await Doc.GetPrinterName();

        if (typeof printerName !== "string" || printerName.trim() === "") {
            throw new Error("Doc.GetPrinterName returned an invalid or empty string.");
        }

        return printerName;
    } catch (error: unknown) {
        return handleVendorError(error, "getPrinterName()");
    }
};

export const getPrinters = async (): Promise<string[]> => {
    try {
        const printerObject = await Doc.GetPrinter();

        if (!printerObject) {
            throw new Error("Doc.GetPrinter returned null or undefined.");
        }

        const printers = await printerObject.GetInstalledPrinters();

        if (!Array.isArray(printers)) {
            throw new Error(
                `Unexpected data type returned from printerObject.GetInstalledPrinters: ${typeof printers}`
            );
        }

        return printers;
    } catch (error: unknown) {
        return handleVendorError(error, "getPrinters()");
    }
};

export const exportDocument = async (type: ExportType, filePath: string, dpi: number = 0): Promise<void> => {
    if (typeof filePath !== "string" || filePath.trim() === "") {
        throw new TypeError("filePath must be a non-empty string.");
    }

    if (typeof dpi !== "number") {
        throw new TypeError("dpi must be a number.");
    }

    try {
        const isExported: boolean = await Doc.Export(type, filePath, dpi);

        if (!isExported) {
            throw new Error(`Failed to export document to '${filePath}'.`);
        }
    } catch (error: unknown) {
        handleVendorError(error, `exportDocument(type=${type}, filePath='${filePath}', dpi=${dpi})`);
    }
};

export const populateObjectsInTemplate = async (data: TemplateData): Promise<void> => {
    try {
        
        // Guard: ensure data is passed and is a plain object
        if (Array.isArray(data)) {
            throw new Error(
                "Failed to populate template objects: expected a non-null object for \"data\", but received an Array."
            );
        }

        if (!data || typeof data !== "object") {
            throw new Error(
                `Failed to populate template objects: expected a non-null object for "data", but received ${JSON.stringify(data)} (type: ${typeof data}).`
            );
        }

        for (const key of Object.keys(data)) {
            const value = data[key];
            const obj = await Doc.GetObject(key);
    
            if (!obj) {
                throw new Error(`Template object with key "${key}" could not be found. Check that the template contains this object before populating.`);
            }
    
            const type: number = await obj.Type;
    
            switch (type) {
            case ObjectTypes.Text:
                obj.Text = value;
                break;
            case ObjectTypes.Image:
                await obj.SetData(0, value, 4);
                break;
            case ObjectTypes.DateTime:
                await obj.SetData(0, value, null);
                break;
            case ObjectTypes.Barcode:
                const barcodeIndex = await Doc.GetBarcodeIndex(key);
                await Doc.SetBarcodeData(barcodeIndex, value);
                break;
            case ObjectTypes.ClipArt:
                await obj.SetData(0, value, 0);
                break;
            default:
                throw new Error(`Unrecognized object type (${type}) for template key "${key}".` +
                " Ensure the template only contains supported types: Text, Image, DateTime, Barcode, or ClipArt.");
            }
    
        }
    } catch (error: unknown) {
        await closeTemplate();
        
        let safeData: string;

        try {
            safeData = JSON.stringify(data);
        } catch {
            safeData = String(data);
        }

        handleVendorError(error, `populateObjectsInTemplate(data=${safeData})`);
    }
};