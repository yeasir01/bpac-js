//import BrotherSdK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
import BrotherSdk from "../../dist/index.js";

const printBtn = document.getElementById("print-btn");
const previewBtn = document.getElementById("preview-btn");
const exportBtn = document.getElementById("export-btn");
const preview = document.getElementById("preview");

const tag = new BrotherSdk({
    templatePath: "C:/Users/YMH/Desktop/example.lbx",
    exportDir: "C:/Users/YMH/Desktop/Exported Labels/",
});

const data = {
    title: "Test Label",
    date: new Date("1/1/23"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
};
/* {autoCut: true, mirroring: true, specialTape:true} */
const printTag = async () => {
    try {
        const complete = await tag.print(data);
        console.log({ complete });
    } catch (error) {
        console.log({ error });
    }
};

const previewTag = async () => {
    try {
        preview.src = "";
        const imgData = await tag.getImageData(data, {height: 120});
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

printBtn.addEventListener("click", printTag);
previewBtn.addEventListener("click", previewTag);
exportBtn.addEventListener("click", exportTag);