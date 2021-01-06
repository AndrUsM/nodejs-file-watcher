let currentLine = new Map();

function appendCurrentLine(line) {
    line = typeof line === 'string' ? line : line.toString();
    currentLine.set(+new Date(), line);
}

function clearCurrentLine() {
    currentLine.clear();
}

function getCurrentLine(){
    return Array.from(currentLine.values()).join("")
}

module.exports = {
    currentLine,
    appendCurrentLine,
    clearCurrentLine,
    getCurrentLine
}