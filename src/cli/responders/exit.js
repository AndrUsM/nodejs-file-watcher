import { out } from '../../lib/coloredOut/out.js';
import { messageType } from '../../lib/coloredOut/messageType.js';

export function exitResponder() {
    out('Buy!', messageType.info);
    process.exit(1);
}