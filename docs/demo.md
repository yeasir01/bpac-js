# Setup

### Package Manager
Install package

```sh
$ npm install bpac-js
```
Either named or default imports ok.

```javascript
import BrotherSDK from "bpac-js";
```
```javascript
import { BrotherSDK } from "bpac-js";
```

### CDN
Include import at the top of your "script.js" file, and set script type to module in in your html file. 
> Tip: Use VS-Code live-server or equivalent for development.

```javascript
import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@{version#}/dist/index.js";
```

```html
<script type="module" src="script.js"></script>
```

## Usage

### Get Printer Name
```javascript
// script.js file

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSDK({
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

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const getPrinters = async () => {
    try {
        const printers = await BrotherSDK.getPrinterList();
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

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSDK({ 
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

// Important: The keys and values must match the object name & type in the template file.
const templateData = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

// All Options: Docs >> Options >> Print Options
const printOptions = {
    copies: 3,
    printName: "Air Force Label",
    highResolution: true
}

const handlePrint = async () => {
    try {
        const isPrinted = await label.print(templateData, printOptions);
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

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSDK({ 
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
const printOptions = {
    highResolution: true
}

const handlePrint = async () => {
    try {
        const isPrinted = await label.print(dataArray, printOptions);
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

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");
const imgElement = document.getElementById("img");

const label = new BrotherSDK({
    templatePath: "C:\\Templates\\shoe-template.lbx"
});

// Important: The keys and values must match the object name & type in the template file.
const templateData = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

const imageOptions = {
    height: 300
}

const handlePreview = async () => {
    try {
        const base64EncodedPNG = await label.getImageData(templateData, imageOptions);
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

import BrotherSDK from "https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js";
const btn = document.getElementById("btn");

const label = new BrotherSDK({
    templatePath: "C:\\Templates\\shoe-template.lbx",
    exportPath: "C:\\Users\\YourProfile\\Desktop\\Exported_Labels\\"
});

// The keys and values must match the objects/types in the template file.
const templateData = {
    title: "Air Force One",
    price: "$149.99",
    barcode: "091207567724",
    date: new Date("2024-1-20"),
};

// All Options: Docs >> Options >> Supported Ext Types
const fileName = "my-image.bmp";

const options = {
    resolution: 90,
    ignoreMissingKeys: true
};

const handleExport = async () => {
    try {
        const success = await label.export(templateData, fileName, options);
        console.log({success}) // Output: {success: true}
    } catch (error) {
        console.log({error})
    }
};

btn.addEventListener("click", handleExport);

```
