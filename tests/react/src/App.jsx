import { useState } from 'react';
import { BrotherSdk } from 'bpac-js';

// Instantiate your class like this
const templateObject = new BrotherSdk({
  templatePath: "C:/Users/YMH/Desktop/example.lbx",
  exportDir: "C:/Users/YMH/Desktop/Exported Labels/",
  printer: "Brother QL-820NWB"
});

const sampleLabelsArray = [
  {
    title: "First Label",
    date: new Date("1/1/24"),
    barcode: "074608352052",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
  },
  {
    title: "Second Label",
    date: new Date("2/2/24"),
    barcode: "012345678905",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
  },
  {
    title: "Third Label",
    date: new Date("3/3/24"),
    barcode: "012344678905",
    image: "C:/Users/YMH/Desktop/Storage Drive Files/Logos/Monogram/my-logo.png",
  }
]

function App() {
  const [ labels, setLables ] = useState([...sampleLabelsArray]);
  const [ selectedImgUrl, setSelectedImgUrl ] = useState("");
  const [ printerList, setPrinterList ] = useState([]);
  const [ errors, setErrors ] = useState({});

  const handlePrint = async ()=>{
    try {

      for (const label of labels){  //I recommend a for-of loop w/await
        await templateObject.print(label);
      }

    } catch (error) {
      console.log({error});
      setErrors(error.message);
    }
  }

  // Preview the first label in the array
  const handlePreview = async ()=>{
    try {
      const base64ImgData = await templateObject.getImageData(labels[0], { height: 120 });
      setSelectedImgUrl(base64ImgData)
    } catch (error) {
      console.log({error});
      setErrors(error.message);    }
  } 

  // Export the first label in the array (make sure the directory exsits)
  const handleExport = async ()=>{
    try {
      const complete = await templateObject.export(labels[0], "custom-label.bmp", 300);
      console.log({complete})
    } catch (error) {
      console.log({error});
      setErrors(error.message);
    }
  }

  const handleGetPrinters = async ()=>{
    try {
      const printers = await BrotherSdk.getPrinterList();
      setPrinterList(printers);
    } catch (error) {
      console.log({error});
      setErrors(error.message)
    }
  }

  return (
    <>
    <div>
      <h1>React Bpac-JS Test</h1>
      <h3>See console log for debuging.</h3>
      <p>Printer List: {JSON.stringify(printerList)}</p>
      <p>Errors: {JSON.stringify(errors)}</p>
    </div>
      <div>
        <img src={selectedImgUrl ? selectedImgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} alt="label preview will go here" />
      </div>
      <div style={{display: 'flex', gap: "10px", margin: "10px 0"}}>
        <button onClick={handlePrint}>Print</button>
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleExport}>Export</button>
        <button onClick={handleGetPrinters}>Get Printers</button>
      </div>
    </>
  )
}

export default App
