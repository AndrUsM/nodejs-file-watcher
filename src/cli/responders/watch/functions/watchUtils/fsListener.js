const readFilesId = require('./readFilesId');

function fsListener(callback) {
    const currentFSState = readFilesId('current');
    const previousFSState = readFilesId('prev');

    let isEqual = JSON.stringify(currentFSState) !== JSON.stringify(previousFSState);
    if (isEqual) callback;
    return isEqual;
}


module.exports = fsListener;