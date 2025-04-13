import { BrotherSdk } from "../../dist/index.js"; // Autocomplete

const label = new BrotherSdk({templatePath: "C:/Users/YMH/Desktop/example.lbx"});

const print = async ()=>{
    try {
        await label.print({name: "John Smith"}, {autoCut: true, highSpeed: true});
    } catch (error) {
        console.error(error)
    }
}

console.log(await BrotherSdk.getPrinterList())