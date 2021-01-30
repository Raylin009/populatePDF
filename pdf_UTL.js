const {PDFDocument} = require('pdf-lib');
const fs = require('fs');
const PDF_PATH = `${__dirname}/pdf_temp/872nd MED DET RST APR BTA (BLANK).pdf`

const read_pdf = async(path) => {
  // This should be a Uint8Array or ArrayBuffer
  // This data can be obtained in a number of different ways
  // If your running in a Node environment, you could use fs.readFile()
  // In the browser, you could make a fetch() call and use res.arrayBuffer()
  
  const existingPdfBytes = fs.readFileSync(path)

  // Load a PDFDocument without updating its existing metadata
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
    updateMetadata: false 
  })
  const form = pdfDoc.getForm()
  const fields = form.getFields()
  fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: ${name}`)
  })

  // // Print all available metadata fields
  // console.log('From:', pdfDoc.getForm)
};

read_pdf(PDF_PATH)

