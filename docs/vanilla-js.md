📢 This Readme is written for Vanilla JS users only to use in your react project please checkout the react-js readme.

# Vanilla JS

## Setup
1.  download the ./dist/bundle.js file from the repo. (Coming Soon)
2.  include the file in your assets folder (./assets/js/bundle.js)
3.  create your script file (./assets/js/script.js)

### Printer Name
```javascript
// script.js file
import BrotherSdk from "./bundle.js";

const getNameBtn = document.getElementById("get-name-btn");

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported Labels/",
});

// Returns the printer associated with the template in string format
const getName = async () => {
    try {
        const printer = await tag.getPrinterName();
        console.log({printer}) // Output: {printer: "Brother QL-820NWB"}
    } catch (error) {
        console.log({error})
    }
};

getNameBtn.addEventListener("click", getName);

```

### Printing
```javascript
// script.js file
import BrotherSdk from "./bundle.js";

const printBtn = document.getElementById("print-btn");

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported Labels/",
});

// The keys and values must match the objects/types in the template file.
const data = {
    title: "Air Force 1",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const options = {
    copies: 1, // Optional - Defaults to 1
    printName: "Air Force Label", // Optional - Defaults to BPAC-Document
    quality: "highQuality" // Optional - Defaults to "default"
}

const sendToPrinter = async () => {
    try {
        const isPrinted = await tag.print(data, options);
        console.log({isPrinted})
    } catch (error) {
        console.log({error})
    }
};

printBtn.addEventListener("click", sendToPrinter);

```

### Preview
```javascript
// script.js file
import BrotherSdk from "./bundle.js";

const previewBtn = document.getElementById("preview-btn");
const imgOutput = document.getElementById("img")

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported Labels/",
});

// The keys and values must match the objects/types in the template file.
const data = {
    title: "Air Force 1",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const options = {
    width: 100, // Optional - Defaults to 0
    height: 0 // Optional - Defaults to 0
}

const previewImage = async () => {
    try {
        const data = await tag.getImageData(data, options); //image data
        imgOutput.src = data;
    } catch (error) {
        console.log({error})
    }
};

previewBtn.addEventListener("click", previewImage);

```
