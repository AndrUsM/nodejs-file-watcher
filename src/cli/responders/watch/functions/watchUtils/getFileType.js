function getFileType(fileStats) {
    return fileStats.isDirectory() ? 'directory' : 'file';
}

module.exports = getFileType;