import { StartPrintOptions, ExportType, PrintOptionFlag } from "./types.ts";

const normalizePath = (pathStr: string): string => {
    // Replace backslashes with forward slashes for consistency.
    let normalized = pathStr.replace(/\\/g, "/");

    // Handle double or multiple slashes.
    normalized = normalized.replace(/\/\/+/g, "/");

    // Remove trailing slashes (except for root).
    if (normalized !== "/" && normalized.endsWith("/")) {
        normalized = normalized.slice(0, -1);
    }

    return normalized;
};

export const getAbsolutePath = (
    basePath: string | undefined,
    filePathOrFileName: string,
): string => {
    if (!filePathOrFileName) {
        throw new Error("File path or file name cannot be empty.");
    }

    if (filePathOrFileName.startsWith("/") || /^[a-zA-Z]:\\/.test(filePathOrFileName)) {
        // If it's already an absolute path (Unix-like or Windows), just return it.
        return normalizePath(filePathOrFileName);
    }

    if (!basePath) {
        throw new Error("Please set basePath or provide the full path.");
    }

    // Normalize the base path and ensure it ends with a separator.
    const normalizedBasePath = normalizePath(basePath);
    const ensuredBasePath = normalizedBasePath.endsWith("/") || normalizedBasePath.endsWith("\\")
        ? normalizedBasePath
        : normalizedBasePath + "/";

    // Combine the base path and file name.
    const absolutePath = ensuredBasePath + filePathOrFileName;

    // Normalize the combined path for consistency.
    return normalizePath(absolutePath);
};

// Optimized 03/15/25
export const getExportType = (fileExt:string):ExportType => {
    switch (fileExt) {
    case ".lbx":
        return 0x1;
    case ".lbl":
        return 0x2;
    case ".lbi":
        return 0x3;
    case ".bmp":
        return 0x4;
    case ".paf":
        return 0x5;
    default:
        throw new Error(`Invalid extension. Expected ".lbx, .lbl, .lbi, .bmp, .paf". Received: ${fileExt}.`);
    }
};

// Optimized 03/15/25
export const getStartPrintOptions = (options: StartPrintOptions): number => {
    let combinedHex = 0x0;

    Object.entries(options).forEach(([key, value]) => {
        if (value === true && PrintOptionFlag[key as keyof typeof PrintOptionFlag] !== undefined) {
            combinedHex |= PrintOptionFlag[key as keyof typeof PrintOptionFlag];
        }
    });

    return combinedHex;
};

// Optimized 03/15/25
export const getFileExtension = (filePathOrFileName: string): string => {
    if (typeof filePathOrFileName !== "string" || !filePathOrFileName.trim()) {
        throw new Error("filePathOrFileName must be a non-empty string.");
    }

    const baseName = filePathOrFileName.split(/[\\/]/).pop() || ""; // Get just the filename part
    const lastDotIdx = baseName.lastIndexOf(".");

    if (lastDotIdx <= 0 || lastDotIdx === baseName.length - 1) {
        // No extension or hidden file or folder.
        throw new Error("No file extension found.");
    }

    const extension = baseName.slice(lastDotIdx).toLowerCase();
    return extension;
};
