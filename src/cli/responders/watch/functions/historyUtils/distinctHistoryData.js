const { applicationHistoryPath } = require("../../constants");
const { writeFile, clearFile } = require("../dataUtils/dataUtils");
const SPECIAL_SIGN = require("./constants");
const getHistory = require("./getHistory");

function distinctHistoryData() {
    const _history = getHistory();
    let resoult = [];

    const checkIdentity = (item) => {
        const checkFunctionResoult = _history.filter(filderItem => {
            return JSON.stringify(filderItem) === JSON.stringify(item);
        });

        return {
            condition: (
                checkFunctionResoult.length &&
                checkFunctionResoult.length === 1
            ),
            data: checkFunctionResoult ? checkFunctionResoult : []
        }
    }

    _history.forEach(item => {
        const allowAction = checkIdentity(item);
        if (allowAction.condition) {
            resoult.push(item);
        } else {
            const _item = allowAction.data[0];
            if (_item) {
                resoult.push(_item);
            }
        }
    })
    if (resoult && resoult.length) {
        let key = 'modificationTime';
        resoult = [
            ...new Map(
                resoult.map(
                    item => [item[key], item])
            ).values()
        ];
        resoult.forEach(historyRecord => {
            let _item = [
                JSON.stringify(historyRecord),
                SPECIAL_SIGN
            ].join('');
            clearFile(applicationHistoryPath);
            writeFile(applicationHistoryPath, _item);
        });
    }
}

module.exports = distinctHistoryData;