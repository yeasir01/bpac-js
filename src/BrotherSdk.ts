import {
    getAbsolutePath,
    getPrintOption,
    getEncodingOption,
} from "./helpers";
import {
    Data,
    Config,
    Encoding,
    ImageOptions,
} from "./types";
import {
    openTemplate,
    closeTemplate,
    populateObjectsInTemplate,
    getPrinterName,
    imageData,
    getPrinters,
    startPrint,
    printOut,
    endPrint,
    exportTemplate,
} from "./adapter";

export default class BrotherSdk {
    #ready: boolean;

    templatePath: string;

    exportDir: string;

    // One mutation observer, regardless of instances.
    static #observer: MutationObserver | undefined;

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
        const printers = await getPrinters();
        return printers;
    }

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

        if (this.#ready) {
            return;
        }

        if (targetNode.classList.contains(className)) {
            this.#ready = true;
            return;
        }

        if (BrotherSdk.#observer) {
            return;
        }

        BrotherSdk.#observer = new MutationObserver(() => {
            if (targetNode.classList.contains(className)) {
                this.#ready = true;
                BrotherSdk.#observer?.disconnect();
                BrotherSdk.#observer = undefined;
            }
        });

        BrotherSdk.#observer.observe(targetNode, {
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
     * { object }
     * @param {Number} [config.copies = 1]
     * number of copies to be printed.
     * @param {String} [config.printName = "BPAC-Document"]
     * print document name.
     * @param {String} [config.option = "default"]
     * use the `PrinterOptions` enum for valid options. formally "quality"
     */
    async print(data: Data, config: Config): Promise<boolean> {
        const copies:number = config?.copies || 1;
        const printName:string = config?.printName || "BPAC-Document";
        const opts:number = getPrintOption(config?.option);

        await this.#isPrintReady();

        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data);
        await startPrint(printName, opts);
        await printOut(copies);
        await endPrint();
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
     * { object }
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
        options: ImageOptions,
    ): Promise<string> {
        const height = options?.height || 0;
        const width = options?.width || 0;

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data);
        const base64Data = await imageData(width, height);
        await closeTemplate();

        return `${base64Data}`;
    }

    /**
     * **Retrieve The Printer's Name**
     *
     * asynchronously retrieves the printers name for the current context.
     *
     * @returns {Promise<string>}
     * a promise that resolves with the name of the printer.
     * @throws {Error}
     * fails to get the printer name.
     *
     */
    async getPrinterName(): Promise<string> {
        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        const printer = getPrinterName();
        await closeTemplate();
        return printer;
    }

    /**
     * **Export Label To File**
     *
     * asynchronously populate & export a copy of the file in various formats.
     *
     * @param {Object} data
     * an object containing key-value pairs, where each key represents
     * an object ID, and the corresponding value is the text to be set on that object.
     * @param {String} [filePathOrFileName = ""]
     * provide a file name or absolute path.
     * - "myLabel.lbx" to be store in exportDir.
     * - "C:/Templates/myLabel.lbx" to override the exportDir.
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
     * fails to export.
     */
    async export(
        data: Data = {},
        filePathOrFileName: string = "",
        encoding: Encoding = Encoding.Default,
        resolution: number = 0,
    ): Promise<boolean> {
        const fileType = getEncodingOption(encoding);
        const path:string = getAbsolutePath(
            this.exportDir,
            filePathOrFileName,
        );

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data);
        const status = await exportTemplate(fileType, path, resolution);
        await closeTemplate();

        if (status) {
            return true;
        }

        throw new Error(
            "Export failed: Please check the export directory and filename.",
        );
    }
}
