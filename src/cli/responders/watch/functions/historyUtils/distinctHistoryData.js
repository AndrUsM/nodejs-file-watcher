const { applicationHistoryPath } = require("../../constants");
const { writeFile } = require("../dataUtils/dataUtils");
const { EVENT_REMOVE } = require("../Events/eventsList");
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
                    item => {
                        const _keyItem = (_key) => item[_key];
                        if (_keyItem('event') !== EVENT_REMOVE) {
                            return [_keyItem(key), item]
                        } else {
                            return item;
                        }
                    })
            ).values()
        ];

        const writeValue = [
            resoult.map(item =>
                JSON.stringify(item))
                .join(SPECIAL_SIGN),
            SPECIAL_SIGN
        ].join("");
        writeFile(applicationHistoryPath, writeValue);
    }
}

module.exports = distinctHistoryData;