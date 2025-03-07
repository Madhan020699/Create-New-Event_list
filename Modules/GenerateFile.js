const ExcelJS = require('exceljs');

const generateExcelBuffer = async (newAssignments) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Secret Santa');

        worksheet.columns = [
            { header: 'Employee Name', key: 'Employee_Name', width: 20 },
            { header: 'Employee Email', key: 'Employee_EmailID', width: 25 },
            { header: 'Secret Child Name', key: 'Secret_Child_Name', width: 20 },
            { header: 'Secret Child Email', key: 'Secret_Child_EmailID', width: 25 }
        ];

        newAssignments.forEach(row => worksheet.addRow(row));

        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' }
            };
            cell.alignment = { horizontal: 'center' };
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    } catch (err) {
        console.error('Error generating Excel buffer:', err);
        throw err;
    }
};

module.exports = generateExcelBuffer;
