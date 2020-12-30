const Readline = require('readline');
const commands = require('./commandList');
const emmiter = require('./emmiters');

const readline = Readline.createInterface({
    input: process.stdin,
    out: process.stdout
})

const cli = {};

cli.promptMessage = () => {
    readline.prompt();
    process.stdout.write("> ");
}

cli.initialize = () => {
    cli.promptMessage()
    readline.on('line', line => {
        const enteredCommand = line ? line.split(' ')[0] : '';
        let matcherCommand = Object.keys(commands).find(command => enteredCommand.startsWith(command));

        if (matcherCommand) emmiter.emit(matcherCommand, line);
        else console.info(`Command ${line} not found`);

        cli.promptMessage()
    });
    readline.on('close', () => {
        process.exit(1);
    });
}

module.exports = cli;