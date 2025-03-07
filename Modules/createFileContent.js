const createNewFile = (employeeFileObj, previousFileObject) => {
    let mailIdList = employeeFileObj.map(emp => [emp['Employee_EmailID'], emp['Employee_Name']]);
    
    const prevMailIdList = previousFileObject.reduce((out, input) => {
        out[input['Employee_EmailID']] = input['Secret_Child_EmailID'];
        return out;
    }, {});

    const assignSecretChild = (currentMailId) => {
        for (let i = 0; i < mailIdList.length; i++) {
            const [potentialChildMail] = mailIdList[i];

            if (currentMailId !== potentialChildMail && prevMailIdList[currentMailId] !== potentialChildMail) {
                return mailIdList.splice(i, 1)[0]; 
            }
        }
        return null;
    };

    const outputFileObject = employeeFileObj.map((value) => {
        const currentMailId = value['Employee_EmailID'];
        const assignedChild = assignSecretChild(currentMailId);

        if (!assignedChild) {
            throw new Error("Unable to assign a valid secret child. Check constraints.");
        }

        return {
            ...value,
            Secret_Child_Name: assignedChild[1],
            Secret_Child_EmailID: assignedChild[0]
        };
    });

    return outputFileObject;
};

module.exports = createNewFile;