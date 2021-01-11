import { getHistory } from './getHistory.js';
import { handleApplicationMode } from '../mode/handleApplicationMode.js';
import { out } from '../../../../../lib/coloredOut/out.js'
import { messageType } from '../../../../../lib/coloredOut/messageType.js'

export function consoleHistory() {
    const _history = getHistory();

    const consoleData = _history.length > 5 ?
        _history.slice(
            _history.length - 5,
            _history.length
        ) : _history;

    const consoleModeCallback = () => {
        if (consoleData && consoleData.length > 0)
            out(consoleData, messageType.default);
        else
            out('History is empty!', messageType.warning)
    };
    const browserModeCallback = () => { };

    handleApplicationMode({
        browserModeCallback: browserModeCallback(),
        consoleModeCallback: consoleModeCallback(),
        defaultModeCallback: consoleModeCallback()
    })
}