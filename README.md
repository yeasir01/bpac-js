<div align="center">
    <img src="./.github/images/printer-logo.png" alt="bPac logo" height="100" />
</div>
<h1 align="center">
    Brother bPac printer SDK for Web Browsers
</h1>
<div align="center">

![NPM Version](https://img.shields.io/npm/v/bpac-js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yeasir01/bpac-js/.github%2Fworkflows%2Fpublish.yml)
![GitHub License](https://img.shields.io/github/license/yeasir01/bpac-js)
![NPM Downloads](https://img.shields.io/npm/dt/bpac-js)

</div>


## Overview

The Brother bPac printer SDK for Web Browsers simplifies the integration of the b-PAC SDK, providing a user-friendly interface for common tasks such as printing and obtaining image data. This SDK aims to enhance accessibility through modern JavaScript practices and thorough documentation, making it a valuable tool for developers working on web-based printing solutions

## Features

-   Modern JavaScript: The SDK has been refactored to use modern JavaScript practices, making it more accessible for developers familiar with contemporary web development.

-   Documentation: Comprehensive documentation has been added to the codebase, ensuring that developers have clear insights into the functionality and usage of each module.

-   IntelliSense Support: With well-documented code and consistent naming conventions, developers can enjoy improved IntelliSense support for a smoother coding experience.

## Prerequisites

Before using the Brother Printer SDK for Web Browsers, ensure you meet the following prerequisites:

1. **Supported Printer Model:**
   - Check the list of supported printer models [here](https://www.brother.co.jp/eng/dev/bpac/environment/index.aspx#model). Ensure that your Brother printer is on the list for compatibility with this SDK. check src folder to identify current bpac version (example: bpac-v3.4.js).

2. **Driver Installation:**
   - Install the appropriate printer driver for your Brother printer on your system. Visit the [Brother Solutions Center](https://support.brother.com/g/s/es/dev/en/bpac/download/index.html?c=eu_ot&lang=en&navi=offall&comple=on&redirect=on#client) to download and follow the installation instructions provided by Brother.

3. **Template Printing Setup:**
   - Ensure that you can successfully print directly from the template file. This may involve configuring your printer settings.

4. **Brother b-PAC Extension:**
   - Install the Brother b-Pac extension for your web browser from the respective extension store. Ensure that the extension is activated and running.

    **Extension Links:**
    - [Brother b-Pac Extension for Chrome](https://chromewebstore.google.com/detail/ilpghlfadkjifilabejhhijpfphfcfhb) - Link to Chrome Extension.
    - [Brother b-Pac Extension for Edge](https://microsoftedge.microsoft.com/addons/detail/brother-bpac-extension/kmopihekhjobijiipnloimfdgjddbnhg) - Link to Edge Extension.
    - [Brother b-Pac Extension for Firefox](https://qflow-badge.azurewebsites.net/badgetemplates/bpac.xpi) - Link to Firefox Add-ons.

Ensure that all prerequisites are met to guarantee a seamless experience.

## Getting Started

### 1. Install the package:

Package Manager
```bash
$ npm i bpac-js
```

Content Delivery Network - Latest
```link
https://cdn.jsdelivr.net/npm/bpac-js@latest/dist/index.js
```
Note: While using the `latest` tag is convenient, it is recommended to exercise caution, especially in production environments. The latest tag always points to the most recent version, which may include breaking changes. To ensure stability, consider specifying a specific version.

### 2. Explore Documentation:

Visit the docs section in this repository to explore detailed guides and examples for utilizing the SDK functionalities.

### 3. Contribute:

If you encounter issues or have suggestions, feel free to contribute to the project. Your input is highly valued!

## Usage

```javascript
// CommonJS Script File
import BrotherSdk from "https://cdn.jsdelivr.net/npm/bpac-js@2.0.3/dist/index.js";

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
    copies: 1, // Optional - Defaults: 1
    printName: "Air Force Label", // Optional - Defaults: BPAC-Document
    highResolution: true // Optional
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

## Acknowledgments

Special thanks to Brother for their QL Series Printer SDK. This project wouldn't be possible without their technology.

Happy coding with Brother QL Series Printer SDK for Web Browsers! 🚀

## License

This project is licensed under the MIT License.
