export function isNullOrUndefined(data) {
    return (
        typeof data === 'undefined' ||
        !data
    )
}