import fs from 'fs';
import { readFile } from '../dataUtils/dataUtils.js';
import { applicationHistoryPath } from '../../constants.js';
import { SPECIAL_SIGN } from './constants.js';

export function getHistory() {
    if (fs.existsSync(applicationHistoryPath)) {
        const data = readFile(applicationHistoryPath);
        if (data && data.length) {
            return data
                .slice(0, -1)
                .trim()
                .split(SPECIAL_SIGN).
                map(item => {
                    switch (typeof item) {
                        case 'object':
                            return item;
                        case 'string':
                            try {
                                return JSON.parse(item);
                            } catch (error) {
                                return {};
                            }
                        default:
                            return {};

                    }
                })
        } else {
            return [];
        }
    } else {
        return [];
    }
}
