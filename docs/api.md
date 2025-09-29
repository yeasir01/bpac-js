# API Reference

## Class 

### `BrotherSdk()`
The main entry point for interacting with the Brother BPac-JS library.

```javascript
import BrotherSdk from "bpac-js";

const label = new BrotherSdk({
    templatePath: "C:\\Templates\\label-template.lbx",
    exportPath: "C:\\Users\\YourProfile\\Desktop",
    printer: "Brother QL-820NWB"
});
```

### Parameters
| **Parameter**     | **Type** | **Required** | **Description** |
|----------------|----------|:--------------:|-----------------|
| `templatePath` | string   | ✅           | Full file path to the label template (.lbx) that defines your label design. Supports Windows absolute paths, UNC network paths, Unix/macOS absolute paths, relative paths, or remote URLs. |
| `exportPath`   | string   | ❌           | Directory path where exported labels will be saved (used with the `export` method). If omitted, labels are not exported to disk unless specified later. |
| `printer`      | string   | ❌           | Name of the Brother printer to use (e.g., `"Brother QL-820NWB"`). If omitted, the default printer on the template will be used. |

| **Path Type**            | **Example**                                      |
| ------------------------ | ------------------------------------------------ |
| Windows Absolute Path    | `C:\Templates\label-template.lbx`                 |
| UNC Network Path         | `\\SERVER\Shared\Templates\label-template.lbx`    |
| Unix/macOS Absolute Path | `/Users/username/Templates/label-template.lbx`    |
| Relative Path            | `./templates/label-template.lbx`                  |
| URL / HTTP Path          | `http://example.com/templates/label-template.lbx` |

> ⚠️ Note:
> Paths must point to a valid .lbx template file.
> Remote URLs must be on the same origin as your webpage to avoid CORS issues.
> Network paths require read access permissions.

## Static Methods

### `getPrinterList()`
Retrieve a list of installed Brother printers available on the system.

```javascript
import BrotherSdk from "bpac-js";

const printers = async () => {
    return await BrotherSdk.getPrinterList();
}

console.log(printers()); //Output: [Brother RJ-4040, Brother QL-820NWB]
```

## Methods

### `print()`
Asynchronously prints one or multiple labels using the specified configurations.

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| data | TemplateData \| TemplateData[] | ✅ | Can be a single object or an array of objects. Each object contains key-value pairs where keys correspond to object IDs in your label template and values are the text/content to set. Passing a single object prints one label; an array enables batch printing. |
| config | PrintConfig | ❌ | Optional object specifying print settings. All options are optional, and defaults are applied if omitted. |

### Options
| **Option** | **Type** | **Default** | **Description** |
|---|---|:---:|---|
| copies | number | 1 |Number of copies to print.|
| printName | string | "BPAC-JS Document" |Document Name for print queue.|
| autoCut | boolean | - |Auto cut after print.|
| cutPause | boolean | - |Pause to cut is applied. Valid only with models not supporting the auto cut function.|
| cutMark | boolean | - |Cut mark is inserted. Valid only with models not supporting the auto cut function.|
| halfCut | boolean | - |Performs half cut.|
| chainPrint | boolean | - |Continuous printing is performed. The final label is not cut, but when the next labels are output, the preceding blank is cut in line with the cut option setting.|
| tailCut | boolean | - |Whenever a label is output, the trailing end of the form is forcibly cut to leave a leading blank for the next label output|
| specialTape | boolean | - |No cutting is performed when printing on special tape. Valid only with PT-2430PC.|
| cutAtEnd | boolean | - |Cut at end is performed.|
| noCut | boolean | - |Disable auto cut|
| mirroring | boolean | - |Mirror print label.|
| quality | boolean | - |Fine quality print.|
| highSpeed | boolean | - |High speed printing.|
| highResolution | boolean | - |High resolution printing.|
| color | boolean | - |Print in color.|
| mono | boolean | - |Print in monochrome.|
| fitPage | boolean | - |Specify whether to adjust the size and position of objects in the template in accordance with layout changes resulting from media changes. If set to true, adjustments will be made; otherwise, if set to false or undefined, no adjustments will be applied.|

> ⚠️ Note: Flags are valid only with models that support the corresponding function. Settings are ignored on models that do not support a given flag.

> 💡For printer-specific options and supported flag combinations, see the [model-functions](./model-functions.md) reference.

```javascript
//Single Print
const printNameTag = async () => {
    const isPrinted = await label.print({name: "Bob Brown"}, {copies: 1});
    console.log({isPrinted}) //Output: {isPrinted: true}
};

printNameTag();
```
```javascript
//Batch Print
const printNameTags = async () => {
    const isPrinted = await label.print([{name: "Bob Brown"}, {name: "John Tran"}], {copies: 1});
    console.log({isPrinted}) //Output: {isPrinted: true}
};

printNameTags();
```

### `getImageData()`
Asynchronously retrieves and returns **Base64-encoded image data** for a label, without printing. This is useful for generating previews or embedding label images in web pages or other applications.

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| data | TemplateData | ✅ | An object containing key-value pairs where each key represents an object ID in your label template, and the value is the text or content to set on that object. |
| options | ImageOptions | ❌ | Optional object specifying image size options such as `width` and `height`. |

### Options
| Option | Type | Default | Description |
|--------|------|:---------:|-------------|
| height | number | 0 | Vertical size (DPI) of the image. If set to `0`, the height is automatically scaled to maintain the aspect ratio based on the `width`. |
| width | number | 0 | Horizontal size (DPI) of the image. If set to `0`, the width is automatically scaled to maintain the aspect ratio based on the `height`. |

> 💡 If both width and height are set to 0, the image will be generated at its template's native resolution.

```javascript
const previewLabel = async () => {
    const img = await label.getImageData({name: "Bob Brown"}, {height: 300, width: 600});
    console.log({img}) //Output: {img: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAAEmCAIAAAC1WCE9A...}
};

previewLabel();
```