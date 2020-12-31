function handleApplicationMode(mode, functions) {
    const {
        browserModeCallback,
        consoleModeCallback,
        defaultModeCallback
    } = functions;

    switch (mode) {
        case applicationBrowserMode: {
            handleInvalidFunctionValue(browserModeCallback);;
            break;
        }
        case applicationConsoleMode: {
            handleInvalidFunctionValue(consoleModeCallback);
            break;
        }
        case applicationDefaultMode:
        default: {
            handleInvalidFunctionValue(defaultModeCallback);;
            break;
        }
    }
}

function handleInvalidFunctionValue(_function) {
    const type = typeof _function;
    if (type === 'function') {
        _function;
    } else {
        const functionNameInMessage = [
            _function,
            'function'
        ].join(':'),
        const message = [
            functionNameInMessage,
            'have wrong type',
            type
        ].join(" ");
        return message;
    }
}

module.exports = handleApplicationMode;