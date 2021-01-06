function isNullOrUndefined(data) {
    return (
        typeof data === 'undefined' ||
        !data
    )
}

module.exports = isNullOrUndefined;