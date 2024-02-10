# Setup

### Package Manager
Install package

```sh
$ npm install bpac-js
```
Import - named or defaults ok.

```javascript
import BrotherBrotherSdk from "bpac-js";
```
```javascript
import { BrotherBrotherSdk } from "bpac-js";
```

### CDN
Include import at the top of your script file. And set type to module in .html (requires live-server or equivalent).

```javascript
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@{version#}/dist/index.js";
```

```html
<script type="module" src="script.js"></script>
```

## Usage

### Get Printer Name
```javascript
// script.js file
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";

const getNameBtn = document.getElementById("get-name-btn");

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported_Labels/",
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

### Get List Of Printers
```javascript
// script.js file
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";

const getNameBtn = document.getElementById("get-name-btn");

const getNames = async () => {
    try {
        const printers = await BrotherSdk.getPrinterList();
        console.log({printers}) // Output: {printers: ["Brother QL-820NWB", "Brother PT-9800PCN"]}
    } catch (error) {
        console.log({error})
    }
};

getNameBtn.addEventListener("click", getNames);

```

### Print
```javascript
// script.js file
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";

const printBtn = document.getElementById("print-btn");

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported_Labels/",
});

// The keys and values must match the objects/types in the template file.
const data = {
    title: "Air Force 1",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

// Docs >> Options >> Print Options - for all options
const options = {
    copies: 1,
    printName: "Air Force Label",
    highResolution: true
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
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.mjs";

const previewBtn = document.getElementById("preview-btn");
const imgOutput = document.getElementById("img")

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported_Labels/",
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

### Export
```javascript
// script.js file
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.mjs";

const exp = document.getElementById("export-btn");

const tag = new BrotherSdk({
    templatePath: "C:/Templates/shoe-template.lbx",
    exportPath: "C:/Users/YourProfile/Desktop/Exported_Labels/",
});

// The keys and values must match the objects/types in the template file.
const data = {
    title: "Air Force 1",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const exportFile = async () => {
    try {
        // Docs >> Options >> Supported Ext Types - for support file types
        const success = await tag.export(data, "Air-Force.bmp", 300);
        console.log({success}) // Output: {success: true}
    } catch (error) {
        console.log({error})
    }
};

exp.addEventListener("click", exportFile);

```
