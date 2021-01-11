import fs from 'fs';
import path from 'path';
import { saveToHistory } from '../functions/historyUtils/saveToHistory.js';
import { eventEmmiter } from '../functions/events/events.js'

export function defaultWatchFolder(folderPath) {
    return fs.watch(folderPath, { recursive: true }, (event, filename) => {
        const filePath = path.join(folderPath, filename);
        saveToHistory({
            event: eventEmmiter(filePath),
            filePath: filePath,
            savedFileData: {}
        });
    });
}