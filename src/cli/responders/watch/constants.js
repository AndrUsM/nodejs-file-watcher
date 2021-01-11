import path from 'path';

export const baseDataPath = path.join(__dirname, 'data');
export const currentFilesIdPath = path.resolve(baseDataPath, '.currentFilesID.dat');
export const previousFilesIdPath = path.resolve(baseDataPath, '.previousFilesID.dat');

export const watchFolderInfoPath = path.resolve(baseDataPath, '.watchFolder.dat');

export const applicationHistoryPath = path.resolve(baseDataPath, '.history.dat');

export const applicationModeConfigFilePath = path.resolve(baseDataPath, '.mode.dat');
export const applicationBrowserMode = 'browser';
export const applicationConsoleMode = 'console';
export const applicationDefaultMode = 'default';
export const applicationModeList = [
    applicationConsoleMode,
    applicationDefaultMode,
    applicationBrowserMode
];