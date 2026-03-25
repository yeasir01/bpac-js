import {
    getAbsolutePath,
    getExportType,
    getFileExtension,
    getStartPrintOptions,
    BpacError,
    assertSameOrigin
} from "./helpers";
import {
    TemplateData,
    PrintOptions,
    ImageOptions,
    ExportOptions,
    BrotherSDKOptions,
    PrinterStatus,
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
    exportDocument,
    setPrinter,
    printerStatus,
} from "./adapter";

export default class BrotherSDK {
    templatePath: string;

    printer?: string;

    exportDir?: string;

    // One mutation observer, regardless of instances.
    static #observer: MutationObserver | null = null;

    static #ready: boolean = false;

    /**
     * **BPAC-JS Class Object**
     *
     * Create a new instance of this class to interact with the Brother SDK
     * in JavaScript. This object facilitates communication and integration
     * with the SDK functionalities.
     * @param {BrotherSDKOptions} options
     * @param {String} options.templatePath
        * Specifies the path to the template file.
        * Supported path formats:
        * - Windows: C:\\\path\\\to\\\your\\\template.lbx
        * - UNC: \\\server\share\template.lbx
        * - Unix: /home/templates/template.lbx
        * - Remote URL: https://yourserver.com/templates/label.lbx

    ⚠️ Important:
    When working with remote URLs, the file must be hosted on the **same origin** as your webpage to avoid to CORS issues.
     * @param {String} [options.exportDir = ""]
     * The path for exporting generated assets.
     * - Win path: C:\\\path\\\to\\\your\\\
     * - Unix path: /home/pictures/
     * @param {String} [options.printer = undefined]
     * The name of the printer used for printing. Specify the printer name, not the path.
     * - Example: "Brother QL-820NWB"
     * @static
     * Use the static method `getPrinterList()` to retrieve an array of installed Brother printers.
     * Each item in the array represents an available printer.
     * @example
     * const printers = await BrotherSdk.getPrinterList();
     * console.log("Available printers:", printers);
     */
    constructor({ templatePath, exportDir, printer }: BrotherSDKOptions) {
        assertSameOrigin(templatePath);
        this.templatePath = templatePath;
        this.exportDir = exportDir;
        this.printer = printer;
        BrotherSDK.#initialize();
    }

    async getPrinterStatus(): Promise<PrinterStatus> {
        await BrotherSDK.printerIsReady();
        await openTemplate(this.templatePath);
        if (this.printer) await setPrinter(this.printer, false);
        const statusObject = await printerStatus();
        await closeTemplate();
        return statusObject;
    }

    /**
     * **Method for Printing a Label (Single or Batch)**
     *
     * Asynchronously prints one or multiple labels using the specified configurations.
     *
     * This function supports both **single-object** and **batch printing**.
     * - If a single `TemplateData` object is passed, it prints one label.
     * - If an array of `TemplateData` objects is passed, it prints multiple labels in sequence.
     *
     * Note: Flags are valid only with those models that support each function.
     * The setting is invalid with models that do not support a function, 
     * even if a flag is set.
     *
     * @param {TemplateData | TemplateData[]} data
     * A **single object** or **an array of objects** containing key-value pairs.
     * Each key represents an object ID, and the corresponding value is the text
     * to be set on that object.
     *
     * @param {PrintOptions} [options]
     * Optional configuration object.
     *
     * @param {Number} [options.copies = 1]
     * Number of copies to print.
     *
     * @param {String} [options.printName = "BPAC-JS Document"]
     * Print document name.
     *
     * @param {boolean} [options.autoCut = false]
     * Auto cut is applied.
     *
     * @param {boolean} [options.cutPause = false]
     * Pause to cut is applied. Valid only with models not supporting the auto cut function.
     *
     * @param {boolean} [options.cutMark = false]
     * Cut mark is inserted. Valid only with models not supporting the auto cut function.
     *
     * @param {boolean} [options.halfCut = false]
     * Executes half cut.
     *
     * @param {boolean} [options.chainPrint = false]
     * Continuous printing is performed. The final label is not cut, but when the next
     * labels are output, the preceding blank is cut in line with the cut option setting.
     *
     * @param {boolean} [options.tailCut = false]
     * Whenever a label is output, the trailing end of the form is forcibly cut to
     * leave a leading blank for the next label output.
     *
     * @param {boolean} [options.specialTape = false]
     * No cutting is performed when printing on special tape.
     * Valid only with PT-2430PC.
     *
     * @param {boolean} [options.cutAtEnd = false]
     * "Cut at end" is performed.
     *
     * @param {boolean} [options.noCut = false]
     * No cutting is performed. Valid only with models supporting cut functions.
     *
     * @param {boolean} [options.mirroring = false]
     * Executes mirror printing.
     *
     * @param {boolean} [options.quality = false]
     * Fine-quality printing is performed.
     *
     * @param {boolean} [options.highSpeed = false]
     * High-speed printing is performed.
     *
     * @param {boolean} [options.highResolution = false]
     * High-resolution printing is performed.
     *
     * @param {boolean} [options.color = false]
     * Color printing is performed.
     *
     * @param {boolean} [options.mono = false]
     * Monochrome printing is performed. Valid only with models supporting
     * the color printing function.
     *
     * @param {boolean} [options.fitPage = false]
     * Specify whether to adjust the size and position of objects in the template in accordance
     * with layout changes resulting from media changes. If set to true, adjustments
     * will be made; otherwise, if set to false or undefined, no adjustments will be applied.
     * 
     * @param {boolean} [options.ignoreMissingKeys = false]
     *  If `true`, any keys in `data` that do not match objects in the template
     *  will be silently ignored.  
     *  If `false`, an error will be thrown when `data` contains keys that do not
     *  correspond to any object in the template.
     * 
     * @returns {Promise<boolean>}
     * Resolves to `true` when printing completes successfully.
     *
     * **Usage Examples**
     *
     * **Single Print**
     * ```typescript
     * await printer.print({ text: "Label 1", barcode: "12345" }, { copies: 2 });
     * ```
     *
     * **Batch Print**
     * ```typescript
     * await printer.print([
     *     { text: "Label 1", barcode: "12345" },
     *     { text: "Label 2", barcode: "67890" }
     * ], { copies: 2 });
     * ```
     */
    async print(data: TemplateData | TemplateData[], options?: PrintOptions): Promise<boolean> {
        const {
            copies = 1,
            printName = "BPAC-JS Document",
            fitPage = false,
            ignoreMissingKeys = false,
            ...rest
        } = options || {};

        await BrotherSDK.printerIsReady();
        const bitwiseOpts = getStartPrintOptions(rest);

        // Normalize data into an array
        const dataArray = Array.isArray(data) ? data : [data];

        await openTemplate(this.templatePath);
        await setPrinter(this.printer, fitPage);

        for (const item of dataArray) {
            await populateObjectsInTemplate(item, ignoreMissingKeys);
            await startPrint(printName, bitwiseOpts);
            await printOut(copies);
        }

        await endPrint();
        await closeTemplate();

        return true;
    }

    /**
     * **Method For Retrieving The Label's Image Data**
     *
     * Asynchronously retrieves and returns Base64-encoded image data for a label.
     *
     * @param {TemplateData} data
     * An object containing key-value pairs, where each key represents an object ID,
     * and the corresponding value is the text to be set on that object.
     * @param {ImageOptions} options
     * Optional
     * @param {number} [options.height = 0]
     * If the vertical size (dpi) of the image to be acquired is specified as 0, it
     * becomes a size that maintains the aspect ratio based on width.
     * @param {number} [options.width = 0]
     * Horizontal size (dpi) of the image to be acquired. If 0 is specified,
     * it becomes a size that maintains the aspect ratio based on height.
     * @param {boolean} [options.ignoreMissingKeys = false]
     *  If `true`, any keys in `data` that do not match objects in the template
     *  will be silently ignored.  
     *  If `false`, an error will be thrown when `data` contains keys that do not
     *  correspond to any object in the template.
     * @returns {Promise<string>}
     * A promise that resolves to a Base64 encoded string representing the image data.
     */
    async getImageData(data: TemplateData, options?: ImageOptions): Promise<string> {
        const {
            width = 0,
            height = 0,
            ignoreMissingKeys = false
        } = options || {};

        await BrotherSDK.printerIsReady();
        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data, ignoreMissingKeys);
        const base64EncodedPNG = await imageData(width, height);
        await closeTemplate();

        return base64EncodedPNG;
    }

    /**
     * **Retrieve The Printer's Name**
     *
     * Asynchronously retrieves the printers name for the current context.
     *
     * @returns {Promise<string>}
     * A promise that resolves with the name of the printer.
     *
     */
    async getPrinterName(): Promise<string> {
        await BrotherSDK.printerIsReady();
        await openTemplate(this.templatePath);
        const printerName = await getPrinterName();
        await closeTemplate();
        return printerName;
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
     * - e.g. = "myLabel.lbx" will be stored in the exportDir path provided.
     * - e.g. = "C:/Templates/myLabel.lbx" will override the exportDir.
     * - Supported file types = .lbx | .lbl | .lbi | .bmp | .paf
     * @param {ExportOptions} options
     * Optional
     * @param {Number} [options.resolution = 0]
     *  Provide a resolution in dpi used for the conversion into bitmap format.
     *  Specifies the resolution of the output device.
     *  (Screen: 72 or 96; output to SC-2000: 600)
     *  If a value of 0 is specified, the printer resolution is used.
     *  The resolution param is only valid for .lbi and .bmp extensions.
     *  @param {boolean} [options.ignoreMissingKeys = false]
     *  If `true`, any keys in `data` that do not match objects in the template
     *  will be silently ignored.  
     *  If `false`, an error will be thrown when `data` contains keys that do not
     *  correspond to any object in the template.
     */
    async export(data: TemplateData, filePathOrFileName: string, options?: ExportOptions): Promise<boolean> {
        const {
            resolution = 0,
            ignoreMissingKeys = false
        } = options || {};

        const fileExt = getFileExtension(filePathOrFileName);
        const fileType = getExportType(fileExt);

        const path: string = getAbsolutePath(
            this.exportDir,
            filePathOrFileName,
        );

        await BrotherSDK.printerIsReady();
        await openTemplate(this.templatePath);
        await populateObjectsInTemplate(data, ignoreMissingKeys);
        await exportDocument(fileType, path, resolution);
        await closeTemplate();

        return true;
    }

    static #initialize(): void {
        const targetNode = document.body;
        const className = "bpac-extension-installed";

        if (BrotherSDK.#ready) {
            return;
        }

        if (BrotherSDK.#observer) {
            return;
        }

        if (targetNode.classList.contains(className)) {
            BrotherSDK.#ready = true;
            return;
        }

        BrotherSDK.#observer = new MutationObserver(() => {
            if (targetNode.classList.contains(className)) {
                BrotherSDK.#ready = true;
                BrotherSDK.#observer?.disconnect();
                BrotherSDK.#observer = null;
            }
        });

        BrotherSDK.#observer.observe(targetNode, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }

    /**
     * **Get List Of Installed Printers**
     *
     * asynchronously retrieves the list of installed printers compatible with the bpac SDK.
     *
     * @returns {Promise<string[]>}
     * a promise that resolves to an array of installed printers
     * compatible with the 'bpac' SDK.
     *
     */
    static async getPrinterList(): Promise<string[]> {
        await BrotherSDK.printerIsReady();
        const printers = await getPrinters();
        return printers;
    }

    static async printerIsReady(timeout: number = 2000): Promise<void> {
        if (BrotherSDK.#ready) {
            return;
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (BrotherSDK.#ready) {
                    resolve();
                } else {
                    reject(
                        new BpacError(
                            `Printer initialization failed: Unable to establish communication within ${timeout} ms. ` +
                            "Verify that the b-PAC extension is installed, active, and that the printer is connected.", 
                            `PrinterIsReady(timeout=${timeout})`
                        )
                    );
                }
            }, timeout);
        });
    }
}
