const checkApplicationModeValue = (mode) => typeof applicationModeList.find(item => item === mode) === 'string';

module.exports = checkApplicationModeValue;