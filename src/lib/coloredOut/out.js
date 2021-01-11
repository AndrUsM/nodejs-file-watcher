import { generateColoredString } from './generateColoredString.js';
import { isNullOrUndefined } from '../checkTypes/isNullOrUndefined.js';
import { messageType } from './messageType.js';

export function out(data, type) {
    // let returnData = typeof returnData === 'boolean' ? returnData : false;

    let coloredMessage = generateColoredString({
        data: data,
        type: type,
        messageType: messageType
    })

    const isDataExist = !isNullOrUndefined(data);
    if (isDataExist) {
        if (type === messageType.default) {
            execute(data);
        }
        else {
            execute(coloredMessage);
        }
    } else {
        execute(coloredMessage);
    }
}

export function execute(message) {
    console.log(message);
}