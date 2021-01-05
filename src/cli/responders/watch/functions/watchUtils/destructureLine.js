function destructureLine(parameters) {
    const {
        line,
        field,
        type,
        defaultValue,
        generateValue,
        checkFunction
    } = parameters;

    if (typeof line === 'string') {
        const splitedLine = line.split('=');

        const _key = splitedLine[0];
        let _value = splitedLine[1];

        if (typeof generateValue === 'function') {
            _value = generateValue(_value);
        }

        const checkPathValue = checkFunction(_value);
        const returnLinePathCondition = _key === field && checkPathValue;
        if (returnLinePathCondition) {
            return _value;
        } else {
            const message = [
                `${field} value isn't valid.`,
                `Type: ${typeof _value}, Value: ${_value}.`,
                `Was used default ${field} value: ${defaultValue}.`
            ].join('\n');
            console.log(message)
            return defaultValue;
        }
    } else {
        console.log(`${field} right format: ${field}=<${field}Value: ${type}>`);
        return defaultValue;
    }
}

module.exports = destructureLine;