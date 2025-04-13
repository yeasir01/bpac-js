import * as bpac from "./vendor/bpac-v3.4.js";
import { TemplateData, ObjectTypes, PrinterStatus, ExportType } from "./types.ts";

const Doc = bpac.IDocument;

// Optimized 03/14/25
export const openTemplate = async (path: string): Promise<void> => {
    if (!path || typeof path !== "string" || path.trim() === "") {
        throw new TypeError("Template path must be a non-empty string.");
    }

    try {
        const isOpen:boolean = await Doc.Open(path);

        if (!isOpen) {
            throw new Error(`Failed to open the template '${path}'. Check path and try again.`);
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            throw error;
        }

        if (error instanceof Error && error.message) {
            throw error;
        }

        throw new Error(`An unexpected error occurred while opening template '${path}'.`);
    }
};

// Optimized 03/15/25
export const setPrinter = async (printerName: string | undefined, fitPage: boolean): Promise<void> => {
    try {
        if (!printerName) {
            throw new Error("Printer name is undefined.");
        }

        const fitPageVariant: number = fitPage ? -1 : 0; // Convert boolean to VARIANT_BOOL

        const result: boolean = await Doc.SetPrinter(printerName, fitPageVariant);

        if (!result) {
            throw new Error("Failed to set printer.");
        }

    } catch (error) {
        try {
            await closeTemplate();
        } catch (closeError) {
            console.error("Error closing template after setPrinter error:", closeError);
        }

        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while setting the printer: ${error}`);
        }
    }
};

// Optimized 03/14/25
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

// Optimized 03/14/25
export const closeTemplate = async (): Promise<void> => {
    try {
        const isClosed = await Doc.Close();

        if (!isClosed) {
            throw new Error("Failed to close the template file.");
        }
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while closing the template. Details: ${String(error)}`);
        }
    }
};

// Optimized 03/14/25
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
            try {
                await closeTemplate();
            } catch (closeError: unknown) {
                let closeErrorMessage = "Failed to close the template after a failed print start. ";
                if (closeError instanceof Error && closeError.message) {
                    closeErrorMessage += `Close Template Error Details: ${closeError.message}`;
                } else {
                    closeErrorMessage += `Close Template Unknown Error Details: ${String(closeError)}`;
                }
                throw new Error(`Failed to start the print process. ${closeErrorMessage}`);
            }
            throw new Error(`Failed to start the print process with printName: '${printName}' and bitmask: '${bitmask}'.`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unknown error occurred during startPrint. Details: ${String(error)}`);
        }
    }
};

// Optimized 03/15/25
export const printOut = async (copies: number): Promise<void> => {
    try {
        const isPrinted: boolean = await Doc.PrintOut(copies, 0);

        if (!isPrinted) {
            throw new Error("Failed to print, please verify the printer name is correct for the template.");
        }

    } catch (error) {
        await closeTemplate();

        if (error instanceof Error) {
            throw error; // Re-throw the original error if it's already an Error object.
        } else {
            throw new Error(`An unexpected error occurred during printing: ${error}`); // Wrap non-Error objects.
        }
    }
};

// Optimized 03/15/25
export const endPrint = async (): Promise<void> => {
    try {
        const hasEnded: boolean = await Doc.EndPrint();

        if (!hasEnded) {
            throw new Error("Failed to end print process.");
        }

    } catch (error) {
        await closeTemplate();

        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while ending the print process: ${error}`);
        }
    }
};

// Optimized 03/15/25
export const imageData = async (width: number, height: number): Promise<string> => {
    try {
        let data = await Doc.GetImageData(4, width, height);

        if (data === null || data === undefined) {
            throw new Error("Doc.GetImageData returned null or undefined.");
        }

        data = data.toString();
        
        if (typeof data !== "string") {
            throw new Error(`Failed to convert Doc.GetImageData result to string. Result type: ${typeof data}`);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while retrieving image data: ${error}`);
        }
    }
};

// Optimized 03/15/25
export const getPrinterName = async (): Promise<string> => {
    try {
        const printerName: string = await Doc.GetPrinterName();

        if (typeof printerName !== "string") {
            throw new Error(`Unexpected data type returned from Doc.GetPrinterName: ${typeof printerName}`);
        }

        if (!printerName) {
            throw new Error("Doc.GetPrinterName returned an empty string.");
        }

        return printerName;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while retrieving the printer name: ${error}`);
        }
    }
};

// Optimized 03/15/25
export const getPrinters = async (): Promise<string[]> => {
    try {
        const printerObject = await Doc.GetPrinter();

        if (!printerObject) {
            throw new Error("Doc.GetPrinter returned null or undefined.");
        }

        const printers = await printerObject.GetInstalledPrinters();

        if (!Array.isArray(printers)) {
            throw new Error(`Unexpected data type returned from printerObject.GetInstalledPrinters: ${typeof printers}`);
        }

        return printers;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred while retrieving the list of printers: ${error}`);
        }
    }
};

// Optimized 03/15/25
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
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`An unexpected error occurred during export. Details: ${String(error)}`);
        }
    }
};

// Optimized 03/15/25
export const populateObjectsInTemplate = async (data: TemplateData): Promise<void> => {
    for (const key of Object.keys(data)) {
        const value = data[key];

        try {
            const obj = await Doc.GetObject(key);

            if (!obj) {
                await closeTemplate();
                throw new Error(`Object "${key}" not found in the template.`);
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
                await closeTemplate();
                throw new Error(`Unknown object type (${type}) for "${key}".`);
            }
        } catch (error: unknown) {
            await closeTemplate();
            if (error instanceof Error) {
                throw new Error(`Error populating object "${key}": ${error.message}`);
            } else {
                throw new Error(`Error populating object "${key}": ${String(error)}`);
            }
        }
    }
};