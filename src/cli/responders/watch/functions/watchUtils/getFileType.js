export function getFileType(fileStats) {
    return fileStats.isDirectory() ? 'directory' : 'file';
}