const formatSizeToUnits = require('./formatSizeToUnits');

function formatSize(sizeInBytes) {
    return formatSizeToUnits(sizeInBytes);
}

module.exports = formatSize;