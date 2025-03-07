const express = require('express');
const readAndStoreFile = require('./Modules/readFile.js');
const createNewFile = require('./Modules/createFileContent.js');

const  generateExcelBuffer = require('./Modules/GenerateFile.js');

const { employeeListPath, previousEmployeeListPath } = require('./Modules/FilePath.js');
const fileName = 'Secret-Santa-Game-Result-2025.xlsx';

const app = express();
const port = 3000;

app.get('/download-excel-2025', async (req, res) => {


    try {

        const currFile = readAndStoreFile(employeeListPath);
        const prevFile = readAndStoreFile(previousEmployeeListPath);
        const newAssignments = createNewFile(currFile, prevFile);

        const buffer = await generateExcelBuffer(newAssignments);

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.end(buffer); 

    } catch (err) {
        if (!res.headersSent) {
            res.status(500).send('Error generating file');
        }
        console.error('Error:', err);
    }

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})



