// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ruby-test" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.runTest', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const commandPattern = vscode
            .workspace
            .getConfiguration('rubyTest')
            .get('testCommand')
        const command = commandPattern
            .replace('$FILE', vscode.workspace.asRelativePath(editor.document.fileName))
            .replace('$LINE', editor.selection.active.line + 1)
        
        const terminal = vscode.window.createTerminal();
        terminal.sendText(command);
        terminal.show();
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;