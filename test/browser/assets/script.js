/**
 * DEMO ONLY: Example usage of bpac-js.
 * Designed for quick testing with VS Code Live Server—click the Live Server icon to open in your browser.
 * This code is not production-ready. 
 * No advanced error handling, or best practices are applied.
*/

// import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@2.2.0/dist/index.js";
import { BrotherSDK } from "../index.js";

window.addEventListener("DOMContentLoaded", () => {
    const printBtn = document.getElementById("print-btn");
    const previewBtn = document.getElementById("preview-btn");
    const productName = document.getElementById("product-name");
    const packedDate = document.getElementById("product-packed-date");
    const weight = document.getElementById("product-weight");
    const price = document.getElementById("product-price");
    const upc = document.getElementById("product-barcode");
    const copiesInput = document.getElementById("copies");
    const printerSelect = document.getElementById("printers");
    const form = document.getElementById("form");
    const imagePreview = document.getElementById("image-preview");

    const origin = window.location.origin;

    const label = new BrotherSDK({
        templatePath: origin + "/assets/template.lbx"
    });

    const populatePrinterSelect = async () => {
        try {
            const printers = await BrotherSDK.getPrinterList();
            const fragment = document.createDocumentFragment();

            printers.forEach((printerName) => {
                const optElem = document.createElement("option");
                optElem.value = printerName;
                optElem.textContent = printerName;
                fragment.append(optElem);
            });

            if (printers.length > 0) {
                printerSelect.innerHTML = "";
                printerSelect.append(fragment);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const labelData = () => {
        //JS timezone issue fix
        const [year, month, day] = packedDate.value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        
        return {
            product: productName.value,
            weight: weight.value,
            price: price.value,
            barcode: upc.value,
            date: date,
        };
    };

    populatePrinterSelect();

    const preview = async (data) => {
        try {
            imagePreview.src = "https://placehold.co/300x300/eeeeee/555555?text=Loding...";
            const base64String = await label.getImageData(data, { width: 300, ignoreMissingKeys: true });
            imagePreview.src = base64String;
        } catch (error) {
            console.error(error);
        }
    };

    const print = async (data) => {
        try {
            await preview(data);

            //Set your printer from the select options
            label.printer = printerSelect.value;

            const printOptions  = {
                copies: copiesInput.value, 
                printName: "Retail Product Tag: " + data.product
            }

            const isPrinted = await label.print(data, printOptions);

            console.log({ isPrinted });
        } catch (error) {
            console.error(error);
        }
    };

    // Prevent form from submitting
    form.addEventListener("submit", (e) => e.preventDefault());
    printBtn.addEventListener("click", () => print(labelData()));
    previewBtn.addEventListener("click", () => preview(labelData()));
});
