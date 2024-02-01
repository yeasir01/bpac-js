import {
    getAbsolutePath,
    getExportType,
    getFileExtension,
    getStartPrintOptions,
} from "./helpers";
import {
    Data,
    PrintConfig,
    ImageOptions,
    Constructor,
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
    setPrinter,
} from "./adapter";

export default class BrotherSdk {
    #ready: boolean;

    templatePath: string;

    printer: undefined | string;

    exportDir: undefined | string;

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
     * - Win path: "C:\\\path\\\to\\\your\\\template.lbx"
     * - Unix path: "/home/templates/template.lbx"
     * - UNC path: "\\\server\share\template.lbx"
     * - Remote URL: "http://yourserver.com/templates/label.lbx"
     * @param {String} [object.exportDir = ""]
     * The path for exporting generated templates.
     * - Win path: "C:\\\path\\\to\\\your\\\"
     * - Unix path: "/home/templates/"
     * @param {String} [object.printer = undefined]
     * The name of the printer used for printing. Specify the printer name, not the path.
     * - Example: "Brother QL-820NWB"
     */
    constructor({ templatePath, exportDir, printer }: Constructor) {
        this.templatePath = templatePath;
        this.exportDir = exportDir;
        this.printer = printer;
        this.#ready = false;
        this.#initialize();
    }

    #initialize() {
        const targetNode = document.body;
        const className = "bpac-extension-installed";

        if (this.#ready) {
            return;
        }

        if (BrotherSdk.#observer) {
            return;
        }

        if (targetNode.classList.contains(className)) {
            this.#ready = true;
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
     * Asynchronously print a label using the specified configurations.
     *
     * @param {Object} data
     * An object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {Object} [config]
     * Optional
     * @param {Number} [config.copies = 1]
     * Number of copies to print.
     * @param {String} [config.printName = "BPAC-Document"]
     * Print document name.
     * @param {boolean} [config.autoCut = false]
     * Auto cut is applied.
     * @param {boolean} [config.cutPause = false]
     * Pause to cut is applied. Valid only with models not supporting the auto cut function.
     * @param {boolean} [config.cutMark = false]
     * Cut mark is inserted. Valid only with models not supporting the auto cut function.
     * @param {boolean} [config.halfCut = false]
     * Executes half cut.
     * @param {boolean} [config.chainPrint = false]
     * Continuous printing is performed. The final label is not cut, but when the next
     * labels are output, the preceding blank is cut in line with the cut option setting.
     * @param {boolean} [config.tailCut = false]
     * Whenever a label is output, the trailing end of the form is forcibly cut to
     * leave a leading blank for the next label output.
     * @param {boolean} [config.specialTape = false]
     * No cutting is performed when printing on special tape.
     * Valid only with PT-2430PC.
     * @param {boolean} [config.cutAtEnd = false]
     * "Cut at end" is performed.
     * @param {boolean} [config.noCut = false]
     * No cutting is performed. Valid only with models supporting cut functions.
     * @param {boolean} [config.mirroring = false]
     * Executes mirror printing.
     * @param {boolean} [config.quality = false]
     * Fine-quality printing is performed.
     * @param {boolean} [config.highSpeed = false]
     * High-speed printing is performed.
     * @param {boolean} [config.highResolution = false]
     * High-resolution printing is performed.
     * @param {boolean} [config.color = false]
     * Color printing is performed.
     * @param {boolean} [config.mono = false]
     * Monochrome printing is performed. Valid only with models supporting
     * the color printing function.
     * @param {boolean} [config.continue = false]
     * Combines with printing for the following DoPrint( ) so that it is a single print job.
     * As a result, when the next DoPrints are called up, the front margins are not output.
     * @param {boolean} [config.fitPage = false]
     * Specify whether to adjust the size and position of objects in the template in accordance
     * with layout changes resulting from media changes. If set to true, adjustments
     * will be made; otherwise, if set to false or undefined, no adjustments will be applied.
     */
    async print(data: Data, config?: PrintConfig): Promise<boolean> {
        const {
            copies = 1,
            printName = "BPAC-Document",
            fitPage = false,
            ...opts
        } = config || {};

        await this.#isPrintReady();

        const bitMask = getStartPrintOptions(opts);

        await openTemplate(this.templatePath);
        await setPrinter(this.printer, fitPage);
        await populateObjectsInTemplate(data);
        await startPrint(printName, bitMask);
        await printOut(copies);
        await endPrint();
        await closeTemplate();

        return true;
    }

    /**
     * **Method For Retrieving The Label's Image Data**
     *
     * Asynchronously retrieves and returns Base64-encoded image data for a label.
     *
     * @param {object} data
     * An object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {object} options
     * Optional
     * @param {string} options.height
     * If the vertical size (dpi) of the image to be acquired is specified as 0, it
     * becomes a size that maintains the aspect ratio based on width.
     * @param {string} options.width
     * Horizontal size (dpi) of the image to be acquired. If 0 is specified,
     * it becomes a size that maintains the aspect ratio based on height.
     * @returns {Promise<string>}
     * A promise that resolves to a Base64 encoded string representing the image data.
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
     * Asynchronously retrieves the printers name for the current context.
     *
     * @returns {Promise<string>}
     * A promise that resolves with the name of the printer.
     * @throws {Error}
     * Fails to get the printer name.
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
     * Asynchronously populate & export a copy of the file in various formats.
     *
     * @param {Object} data
     * An object containing key-value pairs, where each key represents
     * an object ID, and the corresponding value is the text to be set on that object.
     * @param {String} [filePathOrFileName = ""]
     * Provide a file name or absolute path.
     * - e.g. = "myLabel.lbx" will be stored in exportDir.
     * - e.g. = "C:/Templates/myLabel.lbx" to override the exportDir.
     * - Supported types = .lbx | .lbl | .lbi | .bmp | .paf
     * @param {Number} [resolution = 0]
     *  Provide a resolution in dpi used for the conversion into bitmap format.
     *  Specifies the resolution of the output device.
     *  (Screen: 72 or 96; output to SC-2000: 600)
     *  If a value of 0 is specified, the printer resolution is used.
     *
     *  The resolution param is only valid for .lbi and .bmp extensions.
     * @throws {Error}
     * Fails to export.
     */
    async export(data: Data, filePathOrFileName: string, resolution: number = 0): Promise<boolean> {
        const fileExt = getFileExtension(filePathOrFileName);
        const fileType = getExportType(fileExt);

        const path:string = getAbsolutePath(
            this.exportDir,
            filePathOrFileName,
        );

        await this.#isPrintReady();
        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data);
        const status = await exportTemplate(fileType, path, resolution);
        await closeTemplate();

        if (!status) {
            throw new Error(
                "Export failed: Please check the export directory and filename.",
            );
        }

        return true;
    }
}
