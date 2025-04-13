//import BrotherSdK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
import { BrotherSdk } from "./index.js";

const printBtn = document.getElementById("print-btn");
const previewBtn = document.getElementById("preview-btn");
const exportBtn = document.getElementById("export-btn");
const getPrintersBtn = document.getElementById("get-printers-btn");
const preview = document.getElementById("preview");

const tag = new BrotherSdk({
    templatePath: "C:/Users/YMH/Desktop/example.lbx",
    exportDir: "C:/Users/YMH/Desktop/",
    printer: "Brother QL-820NWB"
});

// tag.printer = "Brother PT-9800PCN";

const data = {
    title: "Adams Cool Label",
    date: "03/17/2025",
    barcode: "051000012517",
    image: "C:/Users/YMH/Desktop/Storage/Logos/Monogram/my-logo.png",
    qrCode: "https://www.google.com", 
    imageTwo: "C:/Users/YMH/Desktop/Storage/Logos/Monogram/my-logo.png"
};

const dataOne = {
    title: "Test Label One",
    date: new Date("1/1/23"),
    barcode: "651561561561",
    qrCode: "https://www.norcalice.com", 
    image: "C:/Users/YMH/Desktop/Storage/Logos/Monogram/my-logo.png",
};

const dataTwo = {
    title: "Test Label Two",
    date: new Date("1/1/24"),
    barcode: "516161616115",
    qrCode: "https://www.github.com", 
    image: "C:/Users/YMH/Desktop/Storage/Logos/Monogram/my-logo.png",
};

const printTag = async () => {
    try {
        ///await tag.print([data, dataOne, dataTwo], { highSpeed: true}); //Printing multiple labels
        await tag.print(data, { highSpeed: true}); //Printing a single label
    } catch (error) {
        console.log({ error });
    }
};

const previewTag = async () => {
    try {
        const imgData = await tag.getImageData(data, { width: 300 });
        preview.src = imgData;


        const status = await tag.getPrinterStatus();
        console.log({status})
    } catch (error) {
        console.log({ error });
    }
};

const exportTag = async () => {
    try {
        const complete = await tag.export(data, "custom-label.bmp", 360);
        console.log({complete})
    } catch (error) {
        console.log({ error });
    }
};

const getPrinters = async () => {
    try {
        const printers = await BrotherSdk.getPrinterList();
        console.log({ printers, printer: await tag.getPrinterName() })
    } catch (error) {
        console.log({ error });
    }
};

printBtn.addEventListener("click", printTag);
previewBtn.addEventListener("click", previewTag);
exportBtn.addEventListener("click", exportTag);
getPrintersBtn.addEventListener("click", getPrinters);