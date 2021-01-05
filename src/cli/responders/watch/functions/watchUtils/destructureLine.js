const {
    out,
    messageType
} = require("../../../../../lib/coloredOut/out");
const clearResponder = require("../../../clear");

function destructureLine(parameters) {
    const {
        line,
        field,
        type,
        defaultValue,
        generateValue,
        checkFunction,
    } = parameters;

    let { required } = parameters;
    required = typeof required === 'boolean' ? required : false;

    if (typeof line === 'string') {
        const splitedLine = line.split('=');

        const _key = splitedLine[0];
        let _value = splitedLine[1];

        if (typeof generateValue === 'function') {
            _value = generateValue(_value);
        }

        const checkPathValue = checkFunction(_value);
        const checkKeyOfInputValue = _key === field;
        const returnLinePathCondition = checkKeyOfInputValue && checkPathValue;
        if (returnLinePathCondition) {
            return _value;
        } else {
            const message = [
                `${field} value isn't valid.`,
                `Type: ${typeof _value}, Value: ${_value}.`,
                `Was used default ${field} value: ${defaultValue}.`
            ].join('\n');
            out(message, messageType.warning);
            if (!checkKeyOfInputValue && required)
                exitOnError();
            else
                return defaultValue
        }
    } else {
        out(
            `${field} right format: ${field}=<${field}Value: ${type}>`,
            messageType.warning
        );
        return defaultValue;
    }
}

function exitOnError() {
    out(
        'Required input data like <key>=<value> has invalid key or value. Check input data.',
        messageType.error
    );
    setTimeout(() => {
        console.clear();
    }, 5000);
}

module.exports = destructureLine;