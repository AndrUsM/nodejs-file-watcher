import { platform } from 'os';
import { clearFile } from './functions/dataUtils/dataUtils.js';

import {
    currentFilesIdPath,
    previousFilesIdPath,
    applicationHistoryPath,
    applicationModeConfigFilePath,
    applicationDefaultMode,
    applicationBrowserMode,
    applicationConsoleMode,
    watchFolderInfoPath
} from './constants.js';
import { defaultWatchFolder } from './useCases/defaultWatchFolder.js';
import { watchFolderLinux } from './useCases/watchFolderLinux.js';
import { setApplicationMode } from './functions/mode/setApplicationMode.js';
import {
    initializeApplicationMode,
    initializeWatchPath
} from './functions/watchUtils/initializeInputParameters.js';
import { out } from '../../../lib/coloredOut/out.js';
import { messageType } from '../../../lib/coloredOut/messageType.js';
import { setWatchFolder } from './functions/watchFolder/setWatchFolder.js';

let initialization = true;

function preInitialization() {
    if (initialization) {
        clearFile(applicationModeConfigFilePath);
        clearFile(currentFilesIdPath)
        clearFile(previousFilesIdPath);
        clearFile(applicationHistoryPath);
        clearFile(watchFolderInfoPath);
    }
    initialization = false;
}

export function watchResponder(line) {
    const splitedLine = line.split(' ');

    if (splitedLine) {
        preInitialization();

        let folderPath = initializeWatchPath(splitedLine)
        let applicationMode = initializeApplicationMode(splitedLine);

        setApplicationMode({
            mode: applicationMode
        });
        setWatchFolder(folderPath, folderPath);

        if (!folderPath) {
            out('File or folder path is not defined!', messageType.warning);
        } else {
            _platformCases({
                folderPath: folderPath
            });
        }
    } else {
        const message = [
            'Watch responder must have',
            [
                'path:string',
                '<mode:string>'
            ].join(', '),
            'Mode has such values: ',
            [
                applicationDefaultMode,
                applicationBrowserMode,
                applicationConsoleMode
            ].join(', ')
        ].join(' ');
        out(
            message,
            messageType.error
        );
    }
}

function _platformCases(parameters) {
    let { folderPath } = parameters;

    switch (platform()) {
        case "linux": {
            watchFolderLinux({
                folderPath: folderPath,
                initialization: initialization
            });
            break;
        }
        default:
        case "darwin":
        case "win32": {
            defaultWatchFolder(folderPath);
            break;
        }
    }
}