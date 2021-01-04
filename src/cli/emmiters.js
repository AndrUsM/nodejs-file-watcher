const EventEmmiter = require('events');
const { commandHistory } = require('./commandHistory/commandsHistory');
const commands = require('./commandList');

const clearResponder = require('./responders/clear');
const watchResponder = require('./responders/watch/watch');
const exitResponder = require('./responders/exit');

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
    console.log(commandHistory);
})

module.exports = emmiter;