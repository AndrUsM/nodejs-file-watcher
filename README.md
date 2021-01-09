# Tool to monitor files for changes in real time

_Written using the node js platform_

## Command usage

```console
user@user:~$ npm start
> node index

 Server runned on http://localhost:3000

 watch path=PATH_TO_FOLDER__OR_FILE mode=MODE_VALUE
```

## Available commands:

Command | Parameters | Parameter info | Required | Description
------- |----------- | -------------- | -------- | -----------
|clear  |            |                |          | Clear console
|history|            |                |          | Out command
|watch  | path       | relative path from your home directory | true | Start monitoring in path with some mode
|| mode | values: default, console, browser | false| Where display changes in files and folders

## Watch modes
Mode    | Description
------- | -----------
default | used if mode isn`t valid or not defined.
console | print files changes only in console
browser | print files changes only in browser

## Keyboard shortcuts in cli
Keyboard action | Description
--------------- | -----------
Arrow up        | Run last command if it exist
Arrow left      | Move cursor in left direction
Arrow right     | Move cursor in right direction
Backspace       | Clear current command text
Del             | Clear current line
Ctrl + L        | Clear screen
Ctrl + W        | Clear left command text
Ctrl + A        | Move cursor to start of line
Home            |
End             | Move cursor to end of line
Ctrl + E        |

## Other info
Application is support colored input in console.
Color  | Description
------ | -----------
White  | Default color, used for output json data or text.
Yellow | Used for warning (not critical errors that don`t block application or command processes).
Red    | Critical errors that interrupt application.
Green  | Print not object or json data, report.

## Bugs
* on press <_del_> keyboard key, the line will not be erased, only hidden.
    * process function (clearLine) for stdout does not work properly.
