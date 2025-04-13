import { describe, expect, test } from '@jest/globals';
import { getAbsolutePath, getExportType, getFileExtension, getStartPrintOptions } from "../src/helpers.ts";

const dir = Object.freeze({
    unixBase: "/home/templates/",
    winBase: "C:\\Templates\\",
    uncBase: "",
    fileName: "label.lbx",
});

const fileTypes = Object.freeze({
    ".lbx": 0x1,
    ".lbl": 0x2,
    ".lbi": 0x3,
    ".bmp": 0x4,
    ".paf": 0x5,
});

describe("Helper Functions", () => {
    describe("getAbsolutePath()", () => {
        test("Should be a function", () => {
            expect(typeof getAbsolutePath).toBe("function");
        });

        test("Should throw an error when no args are passed.", () => {
            // @ts-expect-error force no params for testing
            expect(() => getAbsolutePath()).toThrow(Error);
        });

        test("Should throw an error when only one arg is passed.", () => {
            expect(() => getAbsolutePath(undefined, dir.fileName)).toThrow(Error);
        });

        test("Should combine path and filename (backslashes).", () => {
            const result = getAbsolutePath(dir.winBase, dir.fileName);
            expect(result).toContain("C:/Templates/label.lbx");
        });

        test("Should combine path and filename (forward slashes)", () => {
            const result = getAbsolutePath(dir.unixBase, dir.fileName);
            expect(result).toContain("/home/templates/label.lbx");
        });

        test("Should override base path when passing absolute path (forward slashes).", () => {
            const result = getAbsolutePath(
                dir.unixBase,
                dir.unixBase + dir.fileName,
            );
            expect(result).toContain("/home/templates/label.lbx");
        });

        test("Should override base path when passing absolute path (backslashes).", () => {
            const result = getAbsolutePath(
                dir.winBase,
                dir.winBase + dir.fileName,
            );
            expect(result).toContain("C:/Templates/label.lbx");
        });
    });

    describe("getExportType()", () => {
        test("Should be a function", () => {
            expect(typeof getExportType).toBe("function");
        });

        test("Should return the correct values for supported file extensions.", () => {
            Object.entries(fileTypes).forEach(([key, value]) => {
                const funcValue = getExportType(key);
                expect(funcValue).toBe(value);
            });
        });

        test("Should throw an error for unsupported file extensions.", () => {
            expect(() => getExportType(".png")).toThrow(Error);
        });
    });

    // @todo: more coverage for this
    describe("getStartPrintOptions()", () => {
        test("Should be a function", () => {
            expect(typeof getStartPrintOptions).toBe("function");
        });
    });

    describe("getFileExtension()", () => {
        test("Should be a function", () => {
            expect(typeof getFileExtension).toBe("function");
        });

        test("Should throw an error when no path is passed in.", () => {
            // @ts-expect-error force no params for testing
            expect(() => getFileExtension()).toThrow(Error);
        });

        test("Should return the correct file extension when a path is passed in", () => {
            const result = getFileExtension(dir.winBase + dir.fileName);
            expect(result).toBe(".lbx");
        });

        test("Should throw an error when path w/no extension passed", () => {
            expect(() => getFileExtension(dir.winBase)).toThrow(Error);
        });

        test("Should correctly return the last extension when multiple extensions are passed", () => {
            const filePathWithMultipleExtensions = `${dir.winBase}app.exe.${dir.fileName}`;
            const result = getFileExtension(filePathWithMultipleExtensions);
            expect(result).toBe(".lbx");
        });

        test("Should correctly return the last extension from a very long path", () => {
            const veryLongPath = "a".repeat(1000) + dir.winBase + dir.fileName + dir.fileName;
            const result = getFileExtension(veryLongPath);
            expect(result).toBe(".lbx");
        });

        test("Should handle an invalid path and throw an error.", () => {
            const invalidPath = "invalid/path/%$#@!";
            expect(() => getFileExtension(invalidPath)).toThrow(Error);
        });
    });
});
