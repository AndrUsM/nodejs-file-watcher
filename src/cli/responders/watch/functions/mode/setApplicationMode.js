import { checkApplicationModeValue } from './checkApplicationModeValue.js';
import { saveApplicationMode } from './saveApplicationMode.js';
import { setDefaultApplicationMode } from './saveApplicationMode.js';

export function setApplicationMode(parameters) {
    const {
        mode
    } = parameters;
    const checkModeValue = checkApplicationModeValue(mode);
    if (checkModeValue)
        saveApplicationMode(mode);
    else
        setDefaultApplicationMode();
}
