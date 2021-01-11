export function formatTime(timeInMs) {
    const dateTimeObject = new Date(timeInMs);

    let date = fillEmptySpaces([
        dateTimeObject.getDay(),
        dateTimeObject.getMonth(),
        dateTimeObject.getFullYear()
    ]);

    let time = fillEmptySpaces([
        dateTimeObject.getHours(),
        dateTimeObject.getMinutes(),
        dateTimeObject.getSeconds(),
        dateTimeObject.getMilliseconds()
    ]);

    return [
        date.join('.'),
        time.join(':')
    ].join(' ');
}

function fillEmptySpaces(values) {
    return values.map(item => {
        return +item < 10 ? [
            0,
            item
        ].join('') :
            item;
    })
}