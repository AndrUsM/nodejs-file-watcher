import fs from 'fs';
import { readFile } from '../dataUtils/dataUtils.js';
import {
    applicationModeConfigFilePath,
    applicationDefaultMode
} from '../../constants.js';
import { checkApplicationModeValue } from './checkApplicationModeValue.js';
import { setDefaultApplicationMode } from './saveApplicationMode.js';

export function getApplicationMode() {
    const _path = applicationModeConfigFilePath;
    const checkExistence = fs.existsSync(_path);

    if (checkExistence) {
        const mode = readFile(_path);
        if (checkApplicationModeValue(mode)) {
            return mode;
        } else {
            setDefaultApplicationMode();
            return applicationDefaultMode;
        }
    } else {
        setDefaultApplicationMode();
        return applicationDefaultMode;
    }
}
