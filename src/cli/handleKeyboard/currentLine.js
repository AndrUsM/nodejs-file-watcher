export let currentLine = new Map();

export function appendCurrentLine(line) {
    line = typeof line === 'string' ? line : line.toString();
    currentLine.set(+new Date(), line);
}

export function clearCurrentLine() {
    currentLine.clear();
}

export function removeLastItemOfCurrentLine() {
    const _size = currentLine.size;
    if (_size) {
        let keyToRemove = Array.from(currentLine.keys())[_size - 1];
        currentLine.delete(keyToRemove);
    } else
        return false;
}

export function getCurrentLine() {
    return Array.from(
        currentLine.values()
    ).join("");
}