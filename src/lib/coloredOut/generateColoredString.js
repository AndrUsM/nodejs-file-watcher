import { consoleColors } from './colors.js';
import { messageType } from './messageType.js';

export function generateColoredString(options) {
    const {
        data,
        type,
    } = options
    
    const types = Object.values(messageType);
    const checkTypeValue = types.includes(type);
    let color = consoleColors.default;

    if (checkTypeValue) {
        switch (type) {
            case messageType.hidden: {
                color = consoleColors.hidden;
                break;
            }
            case messageType.info: {
                color = consoleColors.fgGreen;
                break;
            }
            case messageType.underscore: {
                color = consoleColors.underscore;
                break;
            }
            case messageType.error: {
                color = consoleColors.fgRed;
                break;
            }
            case messageType.warning: {
                color = consoleColors.fgYellow;
                break;
            }
            case messageType.default:
            default: {
                color = consoleColors.default;
                break;
            }
        }
    }

    const coloredMessage = [
        color,
        data,
        consoleColors.default
    ].join(' ');

    return coloredMessage;
}