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
declare class BrotherSdk {
    #private;
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
    constructor({ templatePath, exportDir }: BrotherSdkConstructor);
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
    print(data: Data, config: PrintConfig): Promise<boolean>;
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
    getImageData(data: Data, opts: {
        height: number;
        width: number;
    }): Promise<string>;
    /**
     * Asynchronously retrieves a list of installed printers compatible with the SDK.
     * @returns {Promise<string[]>}
     * A promise that resolves to an array of strings representing
     * the names of installed printers compatible with the 'bpac' SDK.
     * @throws {Error}
     * If there's an issue while retrieving the printer list.
     *
     */
    static getPrinterList(): Promise<string[]>;
    /**
     * Asynchronously retrieves the name of currently selected printer for the instance.
     *
     * @returns {Promise<string>} A promise that resolves to a strings representing
     * the name of the installed printer.
     * @throws {Error} If there's an issue while retrieving the printer list.
     *
     */
    getPrinterName(): Promise<string>;
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
    export(data?: Data, filePathOrFileName?: string, encoding?: string, resolution?: number): Promise<any>;
}

export { BrotherSdk as default };
