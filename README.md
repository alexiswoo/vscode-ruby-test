# Ruby Test vscode extension

- Run all test within a file.
- Run a single test within a file.

## Setup
- Clone the folder
- Add it to `~/.vscode/extensions/`

By default, the extension uses [mruby](https://github.com/mruby/mruby) to run a single test.

## Configuration
You can change the command to run the tests:
- `rubyTest.testSingleFileCommand`: command to run a single test. `$FILE` (current file) and `$LINE` (current line under cursor) variables are available. Example:
```
"rubyTest.testCommand": "m $FILE:$LINE"
```
- `rubyTest.testAllFileCommand`: command to run all tests on a file. `$FILE` (current file) is available. Example:
```
"rubyTest.testAllFileCommand": "ruby -Itest $FILE"
```
