import fs from 'fs';
import { generateReport } from '../historyUtils/generateReport.js';
import { consoleHistory } from '../historyUtils/consoleHistory.js';
import { saveToHistory } from '../historyUtils/saveToHistory.js';

export function watchFile(filePath) {
    return fs.watchFile(
        filePath,
        { persistent: true },
        (current, previous) => {
            const report = generateReport({
                current: current,
                previous: previous,
                filePath: filePath
            });
            saveToHistory({
                fileData: report
            });
            consoleHistory();
        }
    )
}