function allEqual(items) {
    if (items.length)
        return items.every(v => v === items[0])
    else
        return false;
}

module.exports = {
    allEqual
};