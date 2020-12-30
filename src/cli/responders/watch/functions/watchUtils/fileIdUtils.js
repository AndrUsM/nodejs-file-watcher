function parseFileId(id) {
    const condition = typeof id === 'string' &&
        id.includes('-');
    if (condition) {
        const splitedId = id.split('-');
        return {
            dev: splitedId[0],
            ino: splitedId[1]
        }
    }
    return '';
}

module.exports = {
    parseFileId: parseFileId
}