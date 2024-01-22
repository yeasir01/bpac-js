import BrotherSdK from "https://cdn.jsdelivr.net/npm/bpac-js@2.0.4/dist/index.mjs"

const printBtn = document.getElementById("print-btn");
const previewBtn = document.getElementById("preview-btn");
const exportBtn = document.getElementById("export-btn");
const preview = document.getElementById("preview");

const tag = new BrotherSdK({
    templatePath: "C:/Users/YMH/Desktop/example.lbx",
    exportDir: "C:/Users/YMH/Desktop/Exported Labels/",
});

const data = {
    title: "Test Label",
    date: new Date("1/1/23"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
};

const printTag = async () => {
    try {
        const status = await tag.print(data);
        console.log({ status });
    } catch (error) {
        console.log({ error });
    }
};

const previewTag = async () => {
    try {
        preview.src = "";
        const imgData = await tag.getImageData(data, { height: 120 });
        preview.src = imgData;
    } catch (error) {
        console.log({ error });
    }
};

const exportTag = async () => {
    try {
        const status = await tag.export(data, "my-tag.bmp", "bmp");
        console.log({status})
    } catch (error) {
        console.log({ error });
    }
};

printBtn.addEventListener("click", printTag);
previewBtn.addEventListener("click", previewTag);
exportBtn.addEventListener("click", exportTag);