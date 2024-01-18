<div align="center">
    <img src="./.github/images/printer-logo.png" alt="bPac logo" height="100" />
    <h1 align="center">Brother QL Series Printer SDK for Web Browsers</h1>
</div>

## Overview

This Brother SDK simplifies the usage of the b-PAC SDK, aiming to make it more accessible and providing inline documentation for ease of understanding. The SDK facilitates common tasks such as printing and obtaining image data by encapsulating the b-PAC functionality in a user-friendly interface.

## Features

-   Modern JavaScript: The SDK has been refactored to use modern JavaScript practices, making it more accessible for developers familiar with contemporary web development.

-   Documentation: Comprehensive documentation has been added to the codebase, ensuring that developers have clear insights into the functionality and usage of each module.

-   IntelliSense Support: With well-documented code and consistent naming conventions, developers can enjoy improved IntelliSense support for a smoother coding experience.

## Prerequisites

Before using the Brother QL Series Printer SDK for Web Browsers, ensure you have the following prerequisites installed and configured (Windows Only):

1. **b-PAC Client:**

    - Install the b-Pac Client on your system. You can download it from [Brother Solutions Center](https://support.brother.com/g/s/es/dev/en/bpac/download/index.html?c=eu_ot&lang=en&navi=offall&comple=on&redirect=on#client).
    - Follow the installation instructions provided by Brother to set up the b-Pac Client.

2. **Brother b-PAC Extension:**

    - Install the Brother b-Pac extension for your web browser. You can find it in the browser's extension store. Please ensure that the extension is activated and running.

    **Extension Links:**

    - [Brother b-Pac Extension for Chrome](https://chromewebstore.google.com/detail/ilpghlfadkjifilabejhhijpfphfcfhb) - Link to Chrome Extension.
    - [Brother b-Pac Extension for Edge](https://microsoftedge.microsoft.com/addons/detail/brother-bpac-extension/kmopihekhjobijiipnloimfdgjddbnhg) - Link to Edge Extension.
    - [Brother b-Pac Extension for Firefox](https://qflow-badge.azurewebsites.net/badgetemplates/bpac.xpi) - Link to Firefox Add-ons.

## Getting Started

### 1. Clone the Repository:

```
git clone https://github.com/yeasir01/bpac-javascript.git
```

### 2. Include the SDK in Your Project:

Include the SDK files in your web project, and reference them in your HTML file.

### 3. Explore Documentation:

Visit the examples section in the repository to explore detailed guides and examples for utilizing the SDK functionalities.

### 4. Contribute:

If you encounter issues or have suggestions, feel free to contribute to the project. Your input is highly valued!

## Usage

### Installing the SDK

Include the lib folder in your project:

```js
<script src="assets/js/lib/index.js"></script>
```

## Example Usage

```javascript
// Example: Printing a label
import { BrotherSdk } from "./lib/index.js";

const tag = new BrotherSdk({
    templatePath: "C:/Templates/first.lbx",
    exportPath: "C:/Users/YourName/Desktop/Exported Labels/",
});

const print = async () => {
    try {
        const data = { 
            title: "Canned Soup", 
            price: "$2.99" 
        };

        const opts = {
            copies: 1,
            printName: "Canned Soup Label",
            quality: "highQuality",
        };
        
        const status = await tag.print(data, opts);
        console.log({ status });
    } catch (err) {
        console.log(err);
    }
};

print();
```

## Acknowledgments

Special thanks to Brother for their QL Series Printer SDK. This project wouldn't be possible without their technology.

Happy coding with Brother QL Series Printer SDK for Web Browsers! 🚀

## License

This project is licensed under the MIT License.
