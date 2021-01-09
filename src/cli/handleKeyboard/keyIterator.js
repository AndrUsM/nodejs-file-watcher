const defaultKeyIterator = 1;
let keyIterator = defaultKeyIterator;

function setKeyIterator(value) {
    if (value <= defaultKeyIterator)
        keyIterator = defaultKeyIterator;
    else
        keyIterator = value;
}

const changeKeyIteratorOperation = {
    increase: 'increase',
    decrease: 'decrease'
}

function changeKeyIterator(operation) {
    let value = keyIterator;
    switch (operation) {
        case changeKeyIteratorOperation.decrease: {
            value = keyIterator - 1;
            break;
        }
        case changeKeyIteratorOperation.increase: {
            value = keyIterator + 1;
            break;
        }
        default: {
            break;
        }
    }
    setKeyIterator(keyIterator - 1);
}

module.exports = {
    keyIterator,
    setKeyIterator,
    changeKeyIterator,
    changeKeyIteratorOperation
}