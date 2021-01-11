let currentLine = new Map();

function appendCurrentLine(line) {
    line = typeof line === 'string' ? line : line.toString();
    currentLine.set(+new Date(), line);
}

function clearCurrentLine() {
    currentLine.clear();
}

// oparation: -1, 1
function removeLastItemOfCurrentLine() {
    const _size = currentLine.size;
    if (_size) {
        let keyToRemove = Array.from(currentLine.keys())[_size - 1];
        currentLine.delete(keyToRemove);
    } else
        return false;
}

function getCurrentLine() {
    return Array.from(
        currentLine.values()
    ).join("");
}

module.exports = {
    currentLine,
    appendCurrentLine,
    clearCurrentLine,
    removeLastItemOfCurrentLine,
    getCurrentLine
};