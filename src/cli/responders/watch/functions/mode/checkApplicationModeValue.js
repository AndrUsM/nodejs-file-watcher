import { applicationModeList } from "../../constants.js";

export function checkApplicationModeValue(mode) {
    const item = applicationModeList.find(item => item === mode)
    return typeof item === 'string';
}