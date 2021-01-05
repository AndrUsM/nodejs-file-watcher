const { stdout } = require('process');
const clearResponder = require('../../responders/clear');
const exitResponder = require('../../responders/exit');
const upKeyAction = require('./partials/up');

function handleArrowKeys() {
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
        switch (key) {
            case '\u001B\u005B\u0041': {
                // up
                upKeyAction();
                break;
            }
            case '\u001B\u005B\u0042': {
                // down
                break;
            }
            case '\u001B\u005B\u0043': {
                // right
                break;
            }
            case '\u001B\u005B\u0044': {
                // left
                break;
            }
            case '\u0003': {
                // ctrl + C
                exitResponder();
                break;
            }
            case '\u000C': {
                // clrl + L
                clearResponder();
                break;
            }
            default: {
                return stdout.write(key.toString());
            }
        }
        // console.log(toUnicode(key));
    });
}

function toUnicode(theString) {
    let unicodeString = '';
    for (var i = 0; i < theString.length; i++) {
        let theUnicode = theString
            .charCodeAt(i)
            .toString(16)
            .toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}

module.exports = handleArrowKeys;