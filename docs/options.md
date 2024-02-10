# Notice
Properties are applicable exclusively to models that support each respective function. If a model does not support a particular function, the configuration becomes invalid, even if a prop is specified.

## Supported Ext Types - For Exporting Files
| **Description** | **Extension** |
|---|:---:|
| LBX type | .lbx |
| LBL (P-touch Editor 4.2) | .lbl |
| LBI type | .lbi |
| BMP Image | .bmp |
| PAF Type | .paf |

## Print Options
| **Key** | **Type** | **Default** | **Description** |
|---|---|:---:|---|
| copies | number | 1 |Number of copies to print.|
| printName | string | "BPAC-Document" |Document Name for print queue.|
| autoCut | boolean | false |Auto cut after print.|
| cutPause | boolean | false |Pause to cut is applied. Valid only with models not supporting the auto cut function.|
| cutMark | boolean | false |Cut mark is inserted. Valid only with models not supporting the auto cut function.|
| halfCut | boolean | false |Performs half cut.|
| chainPrint | boolean | false |Continuous printing is performed. The final label is not cut, but when the next labels are output, the preceding blank is cut in line with the cut option setting.|
| tailCut | boolean | false |Whenever a label is output, the trailing end of the form is forcibly cut to leave a leading blank for the next label output|
| specialTape | boolean | false |No cutting is performed when printing on special tape. Valid only with PT-2430PC.|
| cutAtEnd | boolean | false |Cut at end is performed.|
| noCut | boolean | false |Disable auto cut|
| mirroring | boolean | false |Mirror print label.|
| quality | boolean | false |Fine quality print.|
| highSpeed | boolean | false |High speed printing.|
| highResolution | boolean | false |High resolution printing.|
| color | boolean | false |Print in color.|
| mono | boolean | false |Print in monochrome.|
| fitPage | boolean | false |Specify whether to adjust the size and position of objects in the template in accordance with layout changes resulting from media changes. If set to true, adjustments will be made; otherwise, if set to false or undefined, no adjustments will be applied..|

## PT-9500PC / PT-9600 / PT-3600 
| **noCut** | **autoCut** | **halfCut**| **chainPrint** | **Result** |
|:---:|:---:|:---:|:---:|---:|
|✔️|-|-|-|![noCut](../.github/images/no-cut.png) |
|-|-|-|✔️|![chainPrint](../.github/images/chain-print.png) |
|-|-|✔️|-|![halfCut](../.github/images/half-cut.png) |
|-|-|✔️|✔️|![halfCut chainPrint](../.github/images/half-cut-chain.png) |
|-|✔️|-|-|![autoCut](../.github/images/auto-cut.png) |
|-|✔️|-|✔️|![autoCut chainPrint](../.github/images/auto-cut-chain-print.png) |
|-|✔️|✔️|-|![autoCut halfCut](../.github/images/auto-cut-half-cut.png) |
|-|✔️|✔️|✔️|![autoCut halfCut chainPrint](../.github/images/auto-cut-half-chain.png) |

## PT-9700PC / PT-9800PCN / PT-P750W / PT-P910BT / PT-E550W 
| **noCut** | **autoCut** | **halfCut** | **chainPrint** | **specialTape** | **Result** |
|:---:|:---:|:---:|:---:|:---:|---:|
|✔️|-|-|-|-|![noCut](../.github/images/no-cut.png) |
|-|-|-|✔️|-|![chainPrint](../.github/images/chain-print.png) |
|-|-|✔️|-|-|![halfCut](../.github/images/half-cut.png) |
|-|-|✔️|✔️|-|![halfCut chainPrint](../.github/images/half-cut-chain.png) |
|-|✔️|-|-|-|![autoCut](../.github/images/auto-cut.png) |
|-|✔️|-|✔️|-|![autoCut chainPrint](../.github/images/auto-cut-chain-print.png) |
|-|✔️|✔️|-|-|![autoCut halfCut](../.github/images/auto-cut-half-cut.png) |
|-|✔️|✔️|✔️|-|![autoCut halfCut chainPrint](../.github/images/auto-cut-half-chain.png) |
|-|-|-|-|✔️|![specialTape](../.github/images/special-tape.png) |

## PT-D450
| **noCut** | **cutMark** | **chainPrint** | **Result** |
|:---:|:---:|:---:|---:|
|✔️|-|-|![noCut](../.github/images/ncp-no-cut.png) |
|-|-|✔️|![chainPrint](../.github/images/chain-print.png) |
|-|✔️|-|![cutMark](../.github/images/ncp-cut-mark.png) |
|-|✔️|✔️|![cutMark chainPrint](../.github/images/half-cut-chain.png) | 

## PT-E800T / PT-E800TK / PT-E850TKW
| **Media** | **noCut** | **autoCut** | **halfCut** | **chainPrint** | **specialTape** | **Result** |
|:----------|:---:|:---:|:---:|:---:|:---:|---:|
| TZe       |✔️|-|-|-|-|![noCut](../.github/images/no-cut.png) | 1
| TZe       |-|-|-|✔️|-|![chainPrint](../.github/images/chain-print.png) | 2
| TZe       |-|-|✔️|-|-|![halfCut](../.github/images/half-cut.png) | 3
| TZe       |-|-|✔️|✔️|-|![halfCut chainPrint](../.github/images/half-cut-chain.png) | 4
| TZe       |-|-|-|-|-|![autoCut](../.github/images/auto-cut.png) | 5
| TZe       |-|-|-|-|-|![autoCut](../.github/images/auto-cut.png) | 6
| TZe       |-|-|-|-|-|![autoCut](../.github/images/auto-cut.png) | 7
| TZe       |-|-|-|-|-|![autoCut](../.github/images/auto-cut.png) | 8
| TZe       |-|-|-|-|-|![autoCut](../.github/images/auto-cut.png) | 9
| PVC Tube  |-|-|-|-|-|![autoCut chainPrint](../.github/images/auto-cut-chain-print.png) | 10
| PVC Tube  |-|-|-|-|-|![autoCut halfCut](../.github/images/auto-cut-half-cut.png) | 11
| FLe       |-|-|-|-|-|![autoCut halfCut chainPrint](../.github/images/auto-cut-half-chain.png) | 12
| FLe       |-|-|-|-|-|![specialTape](../.github/images/special-tape.png) | 13
