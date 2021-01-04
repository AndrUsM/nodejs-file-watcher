const table = {};

table.generateTableHead = (tableStr) => {
    const headers = [
        'event',
        'filename',
        'size',
        'type',
        'path',
        'access time',
        'modification time',
        'change time',
        'creation time'
    ];

    headers.forEach(item => {
        tableStr += `<th class='table__head table__field'>${item}</th>`;
    });

    return table.wrapHtmlBlock(tableStr, 'tr');
}

table.wrapHtmlBlock = (tableStr, tag, className) => {
    className = className ? className : '';
    return [
        `<${tag} class=${className}>`,
        tableStr,
        `</${tag}>`
    ].join('');
}

table.generateTableBody = (tableStr, data) => {
    data = data.length > 10 ? data.slice(data.length - 10, data.length) : data;

    data.forEach(item => {
        Object.values(item).forEach(field => {
            tableStr += `<td class='table__data table__field'>${field}</td>`;
        });
        tableStr = table.wrapHtmlBlock(tableStr, 'tr', 'table__row');
    });
    return table.wrapHtmlBlock(tableStr, 'tr', 'table__row');
}

table.generateTable = (data) => {
    let tableStr = '';

    tableStr = table.generateTableHead(tableStr);
    tableStr = table.generateTableBody(tableStr, data);
    tableStr = table.wrapHtmlBlock(tableStr, 'table', 'table');

    return tableStr.trim();
}

module.exports = table;