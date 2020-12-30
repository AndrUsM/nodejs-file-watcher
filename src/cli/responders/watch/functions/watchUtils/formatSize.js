function formatSize(sizeInBytes) {
    return [
        sizeInBytes,
        'B'
    ].join(' ')
}

module.exports = formatSize;