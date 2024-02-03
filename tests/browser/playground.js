//import BrotherSdK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
import { BrotherSdk } from "../../dist/index.js";

const printBtn = document.getElementById("print-btn");
const previewBtn = document.getElementById("preview-btn");
const exportBtn = document.getElementById("export-btn");
const getPrintersBtn = document.getElementById("get-printers-btn");
const preview = document.getElementById("preview");

const tag = new BrotherSdk({
    templatePath: "C:/Users/YMH/Desktop/example.lbx",
    exportDir: "C:/Users/YMH/Desktop/Exported Labels/",
    printer: "Brother QL-820NWB"
});

// tag.printer = "Brother PT-9800PCN";

const data = {
    title: "Test Label",
    date: new Date("1/1/23"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
};

const dataOne = {
    title: "Test Label One",
    date: new Date("1/1/23"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
};

const dataTwo = {
    title: "Test Label Two",
    date: new Date("1/1/24"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
};

const printTag = async () => {
    try {
        for (const record of [dataOne/* , dataTwo */]){
            await tag.print(record, {copies: 2, cutAtEnd: true});
        }
    } catch (error) {
        console.log({ error });
    }
};

const previewTag = async () => {
    try {
        const imgData = await tag.getImageData(data, { height: 120 });
        preview.src = imgData;
    } catch (error) {
        console.log({ error });
    }
};

const exportTag = async () => {
    try {
        const complete = await tag.export(data, "custom-label.bmp", 300);
        console.log({complete})
    } catch (error) {
        console.log({ error });
    }
};

const getPrinters = async () => {
    try {
        const printers = await BrotherSdk.getPrinterList();
        console.log({ printers })
    } catch (error) {
        console.log({ error });
    }
};

printBtn.addEventListener("click", printTag);
previewBtn.addEventListener("click", previewTag);
exportBtn.addEventListener("click", exportTag);
getPrintersBtn.addEventListener("click", getPrinters);