import { expect } from "chai";

import {
    getAbsolutePath,
    getExportType,
    getFileExtension,
    getStartPrintOptions,
    // eslint-disable-next-line import/extensions
} from "../src/helpers.ts";

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

/* const bitmaskMap = {
    autoCut: 1,
    cutPause: 1,
    cutMark: 2,
    halfCut: 512,
    chainPrint: 1024,
    tailCut: 2048,
    specialTape: 524288,
    cutAtEnd: 67108864,
    noCut: 268435456,
    mirroring: 4,
    quality: 65536,
    highSpeed: 16777216,
    highResolution: 33554432,
    color: 8,
    mono: 268435456,
    continue: 1073741824,
}; */

describe("Helpers", () => {
    describe("getAbsolutePath()", () => {
        it("Should be a function", () => {
            expect(getAbsolutePath).to.be.a("function");
        });

        it("Should throw an error when no args are passed.", () => {
            // @ts-expect-error force no params for testing
            expect(() => getAbsolutePath()).to.throw(Error);
        });

        it("Should combine path and filename (backslashes).", () => {
            const result = getAbsolutePath(dir.winBase, dir.fileName);
            expect(result).to.have.string("C:\\Templates\\label.lbx");
        });

        it("Should combine path and filename (forward slashes)", () => {
            const result = getAbsolutePath(dir.unixBase, dir.fileName);
            expect(result).to.have.string("/home/templates/label.lbx");
        });

        it("Should override base path when passing absolute path (forward slashes).", () => {
            const result = getAbsolutePath(
                dir.unixBase,
                dir.unixBase + dir.fileName,
            );
            expect(result).to.have.string("/home/templates/label.lbx");
        });

        it("Should override base path when passing absolute path (backslashes).", () => {
            const result = getAbsolutePath(
                dir.winBase,
                dir.winBase + dir.fileName,
            );
            expect(result).to.have.string("C:\\Templates\\label.lbx");
        });
    });

    // @todo: finish test for this
    describe("getExportType()", () => {
        it("Should be a function", () => {
            expect(getExportType).to.be.a("function");
        });

        it("Should return the correct values for supported file extensions.", () => {
            Object.entries(fileTypes).forEach(([key, value]) => {
                const funcValue = getExportType(key);
                expect(funcValue).to.equal(value);
            });
        });

        it("Should throw an error for unsupported file extensions.", () => {
            expect(() => getExportType(".png")).to.throw(Error);
        });
    });

    describe("getStartPrintOptions()", () => {
        it("Should be a function", () => {
            expect(getStartPrintOptions).to.be.a("function");
        });
    });

    describe("getFileExtension()", () => {
        it("Should be a function", () => {
            expect(getFileExtension).to.be.a("function");
        });

        it("Should throw an error when no path is passed in.", () => {
            // @ts-expect-error force no params for testing
            expect(() => getFileExtension()).to.throw(Error);
        });

        it("Should return the correct file extension when a path is passed in", () => {
            const result = getFileExtension(dir.winBase + dir.fileName);
            expect(result).to.equal(".lbx");
        });

        it("Should throw an error when path w/no extension passed", () => {
            expect(() => getFileExtension(dir.winBase)).to.throw(Error);
        });

        it("Should correctly return the last extension when multiple extensions are passed", () => {
            const filePathWithMultipleExtensions = `${dir.winBase}app.exe${dir.fileName}`;
            const result = getFileExtension(filePathWithMultipleExtensions);
            expect(result).to.equal(".lbx");
        });

        it("Should correctly return the last extension from a very long path", () => {
            const veryLongPath = "a".repeat(1000) + dir.winBase + dir.fileName + dir.fileName;
            const result = getFileExtension(veryLongPath);
            expect(result).to.equal(".lbx");
        });

        it("Should handle an invalid path and throw an error.", () => {
            const invalidPath = "invalid/path/%$#@!";
            expect(() => getFileExtension(invalidPath)).to.throw(Error);
        });
    });
});
