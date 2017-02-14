// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('extension.runSingleTest', function () {
        runCommandFromConfigurationKey('testSingleFileCommand')
    });

    const allTestDisposable = vscode.commands.registerCommand('extension.runAllTests', function() {
        runCommandFromConfigurationKey('testAllFileCommand')
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(allTestDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;

function runCommandFromConfigurationKey(configurationKey) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const commandPattern = vscode
        .workspace
        .getConfiguration('rubyTest')
        .get(configurationKey);
    const command = commandPattern
        .replace('$FILE', vscode.workspace.asRelativePath(editor.document.fileName))
        .replace('$LINE', editor.selection.active.line + 1);

    const terminal = vscode.window.createTerminal();
    terminal.sendText(command);
    terminal.show();
}
