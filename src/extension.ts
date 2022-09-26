// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown sort" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown_sort.markdownSort', () => {
		// The code you place here will be executed every time your command is executed

		let editor = vscode.window.activeTextEditor;
		if (!editor ) {
		return;
		}
		const selection = editor.selection;
		let text = editor.document.getText();
		console.log(text);
		
		let headlines1 = text.split((/^#\s/m));
		headlines1 = text.split((/^#\s/m));
		for (let i = 0; i < headlines1.length; i++) {
			if(headlines1[i].length>3){
			  let firstLetterIndex = 0;
			  let prefix = '';
			  if(headlines1[i][0] === '#'){
				firstLetterIndex  = 2;
				//prefix = '# ';
			  }
				headlines1[i] = headlines1[i][firstLetterIndex].toUpperCase() + headlines1[i].substring(firstLetterIndex+1);
			}
		}
		const sorted = headlines1.sort().join('# ');
	
		editor.edit(editBuilder => {
			editBuilder.replace(selection, sorted);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
