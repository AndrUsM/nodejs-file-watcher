const readFilesId = require("../watchUtils/readFilesId");

function historyChanged() {
    const currentFSState = readFilesId('current');
    const previousFSState = readFilesId('prev');

    return (
        JSON.stringify(currentFSState) !==
        JSON.stringify(previousFSState)
    );
}

module.exports = historyChanged;