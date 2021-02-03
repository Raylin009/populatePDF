const {PDFDocument} = require('pdf-lib');
const fs = require('fs');
const PDF_PATH = `${__dirname}/pdf_temp/872nd RST Request Form(old).pdf`;
const PDF_PATH_1380 = `${__dirname}/pdf_temp/872ND MC CO 1380.pdf`;

const printFillableBlocks = async(path) => {
  const existingPdfBytes = fs.readFileSync(path)
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
    updateMetadata: false 
  })
  const fields = form.getFields()
  fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: ${name}`)
  })
}

const creat_pdf = async(path) => {
  const existingPdfBytes = fs.readFileSync(path)
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
    updateMetadata: false 
  });
  return pdfDoc;
}

const getInputFieldsArr = async(loaded_PDF_Obj) => {
  const arr = loaded_PDF_Obj.getForm().getFields();
  return arr;
}


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
  const nameField = form.getTextField("DUTIES TO BE PERFORMEDRow1");
  const checkFields = form.getCheckBox("Check Box3");
  nameField.setText('EVERY THING IS AWESOME!! everything is cool when you are part of a team everything is awesome when you are living a dream. I am a soldier, I am a member of a team I will maintain my arms eqipment and myself')
  checkFields.check()
  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(`${__dirname}/pdf_test_file/test${Date.now()}.pdf`,pdfBytes,)
};

read_pdf(PDF_PATH)

