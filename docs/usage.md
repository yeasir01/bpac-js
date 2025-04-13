# Setup

### Package Manager
Install package

```sh
$ npm install bpac-js
```
Either named or default imports ok.

```javascript
import BrotherBrotherSdk from "bpac-js";
```
```javascript
import { BrotherBrotherSdk } from "bpac-js";
```

### CDN
Include import at the top of your "script.js" file, and set script type to module in "index.html".  Use live-server or equivalent for development.

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
const btn = document.getElementById("btn");

const label = new BrotherSdk({
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

const getPrinter = async () => {
    try {
        const printer = await label.getPrinterName();
        console.log({printer}) // Output: {printer: "Brother QL-820NWB"}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", getPrinter);

```

### Get List Of Printers
```javascript
// script.js file

import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const getPrinters = async () => {
    try {
        const printers = await BrotherSdk.getPrinterList();
        console.log({printers}) // Output: {printers: ["Brother QL-820NWB", "Brother PT-9800PCN"]}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", getPrinters);

```

### Print One Label
```javascript
// script.js file

import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSdk({ 
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

// Important: The keys and values must match the object name & type in the template file.
const dataObject = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

// All Options: Docs >> Options >> Print Options
const options = {
    copies: 3,
    printName: "Air Force Label",
    highResolution: true
}

const handlePrint = async () => {
    try {
        const isPrinted = await label.print(dataObject, options);
        console.log({isPrinted}) // Output: {isPrinted: true}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", handlePrint);

```

### Print Many Labels
```javascript
// script.js file

import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSdk({ 
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

// Important: The keys and values must match the object name & type in the template file.
const dataArray = [{
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
},
{
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
}];

// All Options: Docs >> Options >> Print Options
const options = {
    highResolution: true
}

const handlePrint = async () => {
    try {
        const isPrinted = await label.print(dataArray, options);
        console.log({isPrinted}) // Output: {isPrinted: true}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", handlePrint);

```

### Preview
```javascript
// script.js file

import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");
const imgElement = document.getElementById("img");

const label = new BrotherSdk({
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

// Important: The keys and values must match the object name & type in the template file.
const data = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const options = {
    height: 300
}

const handlePreview = async () => {
    try {
        const base64EncodedPNG = await label.getImageData(data, options);
        imgElement.src = base64EncodedPNG;
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", handlePreview);

```

### Export
```javascript
// script.js file

import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSdk({
    templatePath: "C:\\Templates\\shoe-template.lbx",
    exportPath: "C:\\Users\\YourProfile\\Desktop\\Exported_Labels\\"
});

// The keys and values must match the objects/types in the template file.
const data = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const newFileName = "shoe-label-img.bmp";

const handleExport = async () => {
    try {
        // All Options: Docs >> Options >> Supported Ext Types
        const success = await label.export(data, newFileName, 300);
        console.log({success}) // Output: {success: true}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", handleExport);

```
