import { commands } from './commandList.js';
import EventEmmiter from 'events';
import { clearResponder } from './responders/clear.js'
import { exitResponder } from './responders/exit.js';
import {watchResponder} from './responders/watch/watch.js';
import {historyResponder} from './responders/history.js'; 

const emmiter = new EventEmmiter();

emmiter.on(commands.clear, _ => {
    clearResponder();
});

emmiter.on(commands.exit, _ => {
    exitResponder();
})

emmiter.on(commands.watch, line => {
    watchResponder(line);
});

emmiter.on(commands.history, _ => {
    historyResponder();
})

export default emmiter;