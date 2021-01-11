import path from 'path';
import { eventEmmiter } from '../events/events.js';
import { formatTime } from './formatTime.js';
import { getFileType } from '../watchUtils/getFileType.js';
import { formatSize } from '../watchUtils/formatSize.js';

export function generateReport(items) {
    const {
        current,
        previous,
        filePath
    } = items;
    const {
        atime,
        ctime,
        mtime,
        birthtime,
    } = current;

    const filename = path.basename(filePath);
    return {
        event: eventEmmiter(filePath),
        filename: filename,
        size: [
            `current: ${formatSize(current.size)}`,
            `previous: ${formatSize(previous.size)}`,
            `changes: ${formatSize(current.size - previous.size)}`
        ].join('; '),
        type: getFileType(current),
        path: filePath,
        accessTime: formatTime(atime),
        modificationTime: formatTime(mtime),
        changeTime: formatTime(ctime),
        creationTime: formatTime(birthtime)
    }
}