// eslint-disable-next-line import/extensions
import * as bpac from "./bpac-v3.4.js";

// Types
type Data = Record<string, string | Date>;
type NumberEnum = Record<string, number>;

type Config = {
    copies?: number;
    printName?: string;
    quality?: "default" | "fast" | "high";
};

const QUALITY: NumberEnum = Object.freeze({
    default: 0x0,
    fast: 0x01000000,
    high: 0x02000000,
});

const OBJECT_TYPE: NumberEnum = Object.freeze({
    text: 0,
    barcode: 1,
    image: 2,
    datetime: 3,
    clipart: 4,
});

const FILE_TYPE: NumberEnum = Object.freeze({
    default: 1,
    lbx: 1,
    lbl: 2,
    lbi: 3,
    bmp: 4,
    paf: 5,
});

const doc = bpac.IDocument;

// Helpers
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

const openTemplate = async (path: string): Promise<boolean> => {
    const isOpen = await doc.Open(path);

    if (isOpen) {
        return true;
    }

    throw new Error(
        "Failed to open template file, please check path and try again.",
    );
};

const closeTemplate = async (): Promise<boolean> => {
    const isClosed = await doc.Close();

    if (isClosed) {
        return true;
    }

    throw new Error("Failed to close template file.");
};

const populateObjects = async (data: Data): Promise<boolean> => {
    const props: string[] = Object.keys(data);

    // eslint-disable-next-line no-restricted-syntax
    for (const prop of props) {
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
        case OBJECT_TYPE.text:
            obj.Text = value;
            break;
        case OBJECT_TYPE.image:
            await obj.SetData(0, value, 4);
            break;
        case OBJECT_TYPE.datetime:
            await obj.SetData(0, value);
            break;
        case OBJECT_TYPE.barcode:
            await doc.SetBarcodeData(0, value);
            break;
        case OBJECT_TYPE.clipart:
            await obj.SetData(0, value, 0);
            break;
        default:
            throw new Error(`Unknown type for "${prop}" prop.`);
        }
    }

    return true;
};
// end of helpers

class BrotherSdk {
    #ready: boolean;

    templatePath: string;

    exportDir: string;

    /**
     * @constructor
     * Constructs a new instance of the BrotherSdk class, used
     * for interacting with Brother SDK functionality.
     * @param {Object} object
     * @param {String} object.templatePath
     * Specifies the path to the template file (supports various formats)
     * - Local path: "c:/path/to/your/template.lbx"
     * - UNC path: "\\server\share\template.lbx"
     * - Remote URL: "http://yourserver.com/templates/label.lbx"
     * @param {String} [object.exportDir = ""]
     * The path for exporting generated templates.
     */
    constructor({
        templatePath,
        exportDir,
    }: {
        templatePath: string;
        exportDir?: string;
    }) {
        this.templatePath = templatePath;
        this.exportDir = exportDir || "";
        this.#ready = false;
        this.#initialize();
    }

    #initialize() {
        const targetNode = document.body;
        const className = "bpac-extension-installed";

        if (targetNode.classList.contains(className)) {
            this.#ready = true;
            return;
        }

        let observer: MutationObserver | undefined;

        // eslint-disable-next-line prefer-const
        observer = new MutationObserver(() => {
            if (targetNode.classList.contains(className)) {
                this.#ready = true;
                observer?.disconnect();
            }
        });

        observer.observe(targetNode, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }

    async #isPrintReady(timeout: number = 3000): Promise<boolean> {
        if (this.#ready) {
            return true;
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.#ready) {
                    resolve(true);
                } else {
                    reject(
                        new Error(
                            "Cannot establish printer communication: b-PAC extension missing or inactive. Install/enable.",
                        ),
                    );
                }
            }, timeout);
        });
    }

    /**
     * **Method For Printing A Label**
     *
     * asynchronously print a label using the specified configurations.
     *
     * @param {Object} data
     * an object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {Object} config
     * @param {Number} [config.copies = 1]
     * number of copies to be printed.
     * @param {String} [config.printName = "BPAC-Document"]
     * print document name.
     * @param {("default" | "fast" | "high")} [config.quality = "default"]
     * print quality.
     */
    async print(data: Data, config: Config): Promise<boolean> {
        const copies = config?.copies || 1;
        const printName = config?.printName || "BPAC-Document";
        const printOpt = QUALITY[config?.quality || "default"];

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjects(data);
        await doc.StartPrint(printName, printOpt);
        await doc.PrintOut(copies, 0);
        await doc.EndPrint();
        await closeTemplate();

        return true;
    }

    /**
     * **Method For Retrieving The Label's Image Data**
     *
     * asynchronously retrieves and returns Base64-encoded image data for a label.
     *
     * @param {object} data
     * an object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {object} options
     * @param {string} options.height
     * if the vertical size (dpi) of the image to be acquired is specified as 0, it
     * becomes a size that maintains the aspect ratio based on width.
     * @param {string} options.width
     * horizontal size (dpi) of the image to be acquired. If 0 is specified,
     * it becomes a size that maintains the aspect ratio based on height.
     * @returns {Promise<string>}
     * a promise that resolves to a Base64 encoded string representing the image data.
     */
    async getImageData(
        data: Data,
        options: { height?: number; width?: number },
    ): Promise<string> {
        const height = options?.height || 0;
        const width = options?.width || 0;

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjects(data);
        const base64Data = await doc.GetImageData(4, width, height);
        await closeTemplate();

        return `${base64Data}`;
    }

    /**
     * **Retrieve The List Of Installed Printers**
     *
     * asynchronously retrieves the list of installed printers compatible with the bpac SDK.
     *
     * @returns {Promise<string[]>}
     * a promise that resolves to an array of installed printers
     * compatible with the 'bpac' SDK.
     * @throws {Error}
     * will throw an err if the method fails.
     *
     */
    static async getPrinterList(): Promise<string[]> {
        const printObj = await doc.GetPrinter();
        const printers = await printObj.GetInstalledPrinters();

        return printers;
    }

    /**
     * **Retrieve The Printer's Name**
     *
     * asynchronously retrieves the printers name for the current context.
     *
     * @returns {Promise<string>}
     * a promise that resolves with the name of the printer.
     * @throws {Error}
     * if fails to get the printer name.
     *
     */
    async getPrinterName(): Promise<string> {
        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        const printer = await doc.GetPrinterName();
        await closeTemplate();
        return printer;
    }

    /**
     * **Export Label To File**
     *
     * asynchronously populate & export the template file to a specified format.
     *
     * @param {Object} data
     * an object containing key-value pairs, where each key represents
     * an object ID, and the corresponding value is the text to be set on that object.
     * @param {String} [filePathOrFileName = ""]
     * provide a file name "myLabel.lbx" and the file will be stored in the set exportDir.
     * provide a full path to override the exportDir. "C:/Templates/myLabel.lbx"
     * @param {("default" | "lbx" | "lbl" | "lbi" | "bmp" | "paf")} [encoding = "default"]
     * file encoding type.
     * @param {Number} [resolution = 0]
     *  provide a resolution in dpi used for the conversion into bitmap format.
     *  Specifies the resolution of the output device.
     *  (Screen: 72 or 96; output to SC-2000: 600)
     *  If a value of 0 is specified, the printer resolution is used.
     *
     *  The resolution param is only valid for LBI and BMP formats.
     * @returns {Promise<boolean>}
     * @throws {Error}
     * If fails to export.
     */
    async export(
        data: Data = {},
        filePathOrFileName: string = "",
        encoding: "default" | "lbx" | "lbl" | "lbi" | "bmp" | "paf" = "default",
        resolution: number = 0,
    ): Promise<boolean> {
        const encodingType = FILE_TYPE[encoding || "default"];

        if (Number.isNaN(encodingType)) {
            throw new Error(
                `Invalid encoding type. Expected (${Object.keys(FILE_TYPE).join(
                    " | ",
                )}) received "${encoding}"`,
            );
        }

        const destinationPath = getAbsolutePath(
            this.exportDir,
            filePathOrFileName,
        );

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjects(data);
        const status = await doc.Export(
            encodingType,
            destinationPath,
            resolution,
        );
        await closeTemplate();

        if (status) {
            return true;
        }

        throw new Error(
            "Export failed: Please check the export directory and filename.",
        );
    }
}

export default BrotherSdk;
