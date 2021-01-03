const readFilesId = require('./readFilesId');

function fsListener() {
    const currentFSState = readFilesId('current');
    const previousFSState = readFilesId('prev');

    let isEqual = JSON.stringify(currentFSState) !== JSON.stringify(previousFSState);
    return isEqual;
}


module.exports = fsListener;