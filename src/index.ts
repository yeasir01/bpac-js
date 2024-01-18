// eslint-disable-next-line import/extensions
import * as bpac from "./bpac.js";

// Types & Interface
type Data = {
    [key: string]: string | Date;
};

type PrintConfig = {
    copies: number;
    printName: string;
    quality: string;
};

type BrotherSdkConstructor = {
    templatePath: string;
    exportDir: string;
};

type NumberEnum = {
    [key: string]: number;
};

// Helpers
const doc = bpac.IDocument;

const fileType: NumberEnum = Object.freeze({
    default: 1,
    lbx: 1,
    lbl: 2,
    lbi: 3,
    bmp: 4,
    paf: 5,
});

const objectType: NumberEnum = Object.freeze({
    TEXT: 0,
    BARCODE: 1,
    IMAGE: 2,
    DATETIME: 3,
    CLIPART: 4,
});

const printQuality: NumberEnum = Object.freeze({
    default: 0x0,
    fastPrint: 0x01000000,
    highQuality: 0x02000000,
});

const getAbsolutePath = (
    basePath: string,
    filePathOrFileName: string,
): string => {
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

const open = async (path: string): Promise<boolean> => {
    try {
        const isOpen = await doc.Open(path);
        return isOpen;
    } catch (_e) {
        await doc.Close();
        throw new Error(
            "Failed to open template file, please check path and try again.",
        );
    }
};

const populateObjects = async (data: Data): Promise<boolean> => {
    const props: string[] = Object.keys(data);

    // eslint-disable-next-line no-restricted-syntax
    for (const prop of props) {
        const value = data[prop];
        const obj = await doc.GetObject(prop);

        if (!obj) {
            await doc.Close();
            throw new Error(
                `The "${prop}" object does not exist in the template.`,
            );
        }

        const type = await obj.Type;

        switch (type) {
        case objectType.TEXT:
            obj.Text = value;
            break;
        case objectType.IMAGE:
            await obj.SetData(0, value, 4);
            break;
        case objectType.DATETIME:
            await obj.SetData(0, value);
            break;
        case objectType.BARCODE:
            await doc.SetBarcodeData(0, value);
            break;
        case objectType.CLIPART:
            await obj.SetData(0, value, 0);
            break;
        default:
            throw new Error(`Invalid type for "${prop}" prop.`);
        }
    }

    return true;
};
// end of helpers

class BrotherSdk {
    ready: boolean;

    templatePath: string;

    exportDir: string;

    /**
     * Constructor for the BrotherSdk class.
     * @constructor
     * @param {Object} options
     * Configuration options.
     * @param {String} options.templatePath
     * Path (UNC) or URL to the template file Can be specified
     * as \\your_server\your_folder\your_file for a file on a
     * file-sharing server Can be specified as http://your_server/your_file
     * for a template file URL.
     * @param {String} options.exportDir
     * The path for exporting generated templates.
     */
    constructor({ templatePath, exportDir }: BrotherSdkConstructor) {
        this.ready = false;
        this.templatePath = templatePath;
        this.exportDir = exportDir;
        this.#initialize(4000);
    }

    #initialize(timeout: number) {
        const targetNode = document.body;
        const className = "bpac-extension-installed";

        if (targetNode.classList.contains(className)) {
            this.ready = true;
            return;
        }

        let observer: MutationObserver | undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const cleanup = () => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };

        // eslint-disable-next-line prefer-const
        observer = new MutationObserver(() => {
            if (targetNode.classList.contains(className)) {
                this.ready = true;
                observer?.disconnect();
                cleanup();
            }
        });

        observer.observe(targetNode, {
            attributes: true,
            attributeFilter: ["class"],
        });

        timeoutId = setTimeout(() => {
            // eslint-disable-next-line no-console
            console.error(
                "The b-PAC extension may not be installed or active.",
            );
            cleanup();
        }, timeout);
    }

    /**
     * @param {object} data
     * An object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {object} config
     * Configuration options
     * @param {number} config.copies
     * The number of copies to be printed.
     * @param {string} config.printName
     * The name of the document to be printed.
     * @param {keyof printQuality} config.quality
     * Print quality.
     * @returns {boolean}
     * A promise that resolves with a boolean.
     */
    async print(data: Data, config: PrintConfig): Promise<boolean> {
        const copies = config?.copies || 1;
        const printName = config?.printName || "BPAC-Document";
        const printOpt = printQuality[config?.quality || "default"];

        await open(this.templatePath);
        await populateObjects(data);
        await doc.StartPrint(printName, printOpt);
        await doc.PrintOut(copies, 0);
        await doc.EndPrint();
        await doc.Close();

        return true;
    }

    /**
     * @param {object} data
     * An object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {object} opts
     * Config options.
     * @param {string} opts.height
     * If the vertical size (pixel) of the image to be acquired is specified as 0, it
     * becomes a size that maintains the aspect ratio based on width.
     * @param {string} opts.width
     * Horizontal size (pixel) of the image to be acquired. If 0 is specified,
     * it becomes a size that maintains the aspect ratio based on height.
     * @returns {Promise<string>}
     * returns a base64 string.
     */
    async getImageData(
        data: Data,
        opts: { height: number; width: number },
    ): Promise<string> {
        const height = opts?.height || 0;
        const width = opts?.width || 0;

        await open(this.templatePath);
        await populateObjects(data);
        const base64Data = await doc.GetImageData(4, width, height);
        await doc.Close();

        return `${base64Data}`;
    }

    /**
     * Asynchronously retrieves a list of installed printers compatible with the SDK.
     * @returns {Promise<string[]>}
     * A promise that resolves to an array of strings representing
     * the names of installed printers compatible with the 'bpac' SDK.
     * @throws {Error}
     * If there's an issue while retrieving the printer list.
     *
     */
    static async getPrinterList(): Promise<string[]> {
        const printObj = await doc.GetPrinter();
        const printers = await printObj.GetInstalledPrinters();

        return printers;
    }

    /**
     * Asynchronously retrieves the name of currently selected printer for the instance.
     *
     * @returns {Promise<string>} A promise that resolves to a strings representing
     * the name of the installed printer.
     * @throws {Error} If there's an issue while retrieving the printer list.
     *
     */
    async getPrinterName(): Promise<string> {
        await open(this.templatePath);
        const printer = await doc.GetPrinterName();
        await doc.Close();
        return printer;
    }

    /**
     * Asynchronously exports a file.
     * @param {object} data
     * An object containing key-value pairs, where each key represents
     * an object ID, and the corresponding value is the text to be set on that object.
     * @param {string} filePathOrFileName
     *  Path or file name with extension. If initiated with:
     *  - Full path (e.g., 'C:/Users/YourName/Desktop/Exported Labels/cool-label.lbx')
     *  - Only file name with extension (e.g., 'cool-label.lbx').
     * @param {keyof fileType} encoding
     * File encoding type.
     *  - default: Same type as the currently open template.
     *  - lbx: LBX file type.
     *  - lbl: P-touch Editor 4.2 (older format).
     *  - lbi: LBI file type.
     *  - bmp: BMP (monochrome).
     *  - paf: PAF file type.
     * @param {number} resolution
     *  Resolution in dpi used for the conversion into bitmap format.
     *  Specifies the resolution of the output device.
     *  (Screen: 72 or 96; output to SC-2000: 600)
     *  If a value of 0 is specified, the printer resolution is used.
     *  Encoding is only valid for LBI format and BMP format.
     * @returns {Promise<boolean>}
     * A Promise that resolves to a boolean indicating the export status.
     * @throws {Error}
     * If an invalid encoding is supplied to the export method.
     */
    async export(
        data: Data = {},
        filePathOrFileName: string = "",
        encoding = "default",
        resolution = 0,
    ) {
        const encodingType = fileType[encoding || "default"];

        if (Number.isNaN(encodingType)) {
            throw new Error(
                `Invalid encoding type. Expected (${Object.keys(fileType).join(
                    " | ",
                )}) received "${encoding}"`,
            );
        }

        const destinationPath = getAbsolutePath(
            this.exportDir,
            filePathOrFileName,
        );

        await open(this.templatePath);
        await populateObjects(data);
        const status = await doc.Export(
            encodingType,
            destinationPath,
            resolution,
        );
        await doc.Close();

        return status;
    }
}

export default BrotherSdk;
