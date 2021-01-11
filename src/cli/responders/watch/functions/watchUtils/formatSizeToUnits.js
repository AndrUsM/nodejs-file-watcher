var units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
];

const formatSizeToUnits = (bytes) => {
    if (bytes <= 0) {
        return [
            bytes,
            'B'
        ].join(' ');
    }

    const sizeLog = Math.log(bytes) / Math.log(1024);
    const size = Math.floor(sizeLog);
    const unitIndex = parseInt(size);

    const notRoundedSize = bytes / Math.pow(1024, unitIndex);
    const finalSize = Math.round(notRoundedSize, 2);
    const unit = units[unitIndex];

    return [
        finalSize,
        unit
    ].join(' ');
}

module.exports = formatSizeToUnits