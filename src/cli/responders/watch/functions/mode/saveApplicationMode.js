import fs from 'fs';
import { writeFile } from '../dataUtils/dataUtils.js';
import {
    applicationModeConfigFilePath,
    applicationDefaultMode
} from "../../constants.js";
import { checkApplicationModeValue } from './checkApplicationModeValue.js';

export function saveApplicationMode(modeValue) {
    const allowWritingToFile =
        fs.existsSync(applicationModeConfigFilePath) &&
        checkApplicationModeValue(modeValue);
    if (allowWritingToFile) {
        writeFile(applicationModeConfigFilePath, modeValue);
    } else {
        setDefaultApplicationMode();
    }
}

export function setDefaultApplicationMode() {
    writeFile(applicationModeConfigFilePath, applicationDefaultMode);
}
