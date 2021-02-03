const {PDFDocument} = require('pdf-lib');
const fs = require('fs');
const PDF_PATH = `${__dirname}/pdf_temp/872nd RST Request Form(old).pdf`;
const WRITE_PATH = `${__dirname}/pdf_test_file/test${Date.now()}.pdf`
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
  const existingPdfBytes = fs.readFileSync(path)

  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
    updateMetadata: false 
  })
  const form = pdfDoc.getForm()
  const nameField = form.getTextField("DUTIES TO BE PERFORMEDRow1");
  const checkFields = form.getCheckBox("Check Box3");
  nameField.setText('EVERY THING IS AWESOME!! everything is cool when you are part of a team everything is awesome when you are living a dream. I am a soldier, I am a member of a team I will maintain my arms eqipment and myself')
  checkFields.check()
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`${__dirname}/pdf_test_file/test${Date.now()}.pdf`,pdfBytes,)
};

const addName = async(name) => {
  const pdf = await creat_pdf(PDF_PATH);
  const form = pdf.getForm();
  const nameField = form.getTextField("1 NAME Last First MI");
  nameField.setText(name);
  const pdfWithName = await pdf.save();
  return pdfWithName;
}

const writePDF = (write_path, pdfObj) => {
  fs.writeFileSync(write_path,pdfObj)
}

const test = () => {
  addName("Ray testing addName dynamic input")
  .then((data)=> (writePDF(WRITE_PATH, data)))
  .catch(console.log)
}

test()

/*
curry function plan 

(field Type)=> {
  return (id)=>{
    return (input, {save: true|false}) => {

    }
  }
}


return an obj
{
  _3_doms:(inpout, {save: true}) => {...},
  _5_SSN
  _Check_Box4
  _Check_Box5
}
*/





// read_pdf(PDF_PATH)

