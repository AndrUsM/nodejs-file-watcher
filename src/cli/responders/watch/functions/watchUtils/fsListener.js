const readFilesId = require('./readFilesId');

function fsListener(callback) {
    const currentFSState = readFilesId('current');
    const previousFSState = readFilesId('prev');

    console.log(currentFSState, previousFSState);

    let isEqual = JSON.stringify(currentFSState) === JSON.stringify(previousFSState);
    if (isEqual) callback;
}


module.exports = fsListener;