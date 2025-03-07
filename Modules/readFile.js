const XLSX = require('xlsx');

const readAndStoreFile = (filePath) => {
    const file = XLSX.readFile(filePath);
    return XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
};

module.exports = readAndStoreFile;
