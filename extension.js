// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const da_words_json = require('./words_dictionary.json')

const internal = require('stream');
const { getTextOfJSDocComment } = require('typescript');
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "monkeyType" is now active!');
	vscode.window.showInformationMessage('MOOOOONKEY!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('monkeyType.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from monkeyType!');

		vscode.commands.executeCommand('notifications.clearAll');
		const editor = vscode.window.activeTextEditor;
		const text = generateTheText();
		
			let i = 0;

			async function typeCharacter() {		
				if (i === text.length){
				return;
				}
				editor.edit((active) => {
				const pos = editor.selection.anchor;
				active.insert(pos, text[i]);
				});
				i += 1; 
				setTimeout(typeCharacter, 40);
			};
			typeCharacter()
		

	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateTheText(){
    var da_words = Object.keys(da_words_json);
    var varNames = [];
    var text = makeDefaultVars() + "\n\n";
    var indent = "";


    generateCode();
    return text;

    function generateCode(){
        for (let ii = 0; ii < 2; ii ++ ){
        let randNum = Math.random() 

        if (randNum < 0.4 ){
            let functionName = makeRandomString();
            varNames.push(functionName + "()");
            text += indent + functionName + "()\n" 
            text += indent + "function " + functionName + "(){\n"
            indent += "    "
            generateCode()
            indent = indent.slice(0, indent.length - 4)
            text += indent + "};\n\n"
        } else if (randNum < 0.6){
            let tmp = makeRandomString();
            varNames.push(tmp)
                text += indent + "let " + tmp + " = " + makeRandomInt(10) + ";\n"; 
        } else {
            let var1 = makeRandomInt(varNames.length);
            let var2 = makeRandomInt(varNames.length);
            let var3 = makeRandomInt(varNames.length);

            text += indent + varNames[var1] + " = " + varNames[var2] + " + " + varNames[var3] + ";\n";
        }
    }
    }



    function makeRandomString() {
        let randInt = makeRandomInt(da_words.length)
        return da_words[randInt];
    }

    function makeRandomString2() {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        let stringLength = makeRandomInt()+5
        for ( var i = 0; i < stringLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    function makeRandomInt(length = 5) {
        return (Math.floor(Math.random()*length))
    }

    function makeDefaultVars(){
        varNames = [makeRandomString(),makeRandomString(),makeRandomString(),makeRandomString(),makeRandomString(),makeRandomString()]
        let string = "let " + varNames[0] + " = \"" + makeRandomString() + "\"\n"
        string += "let " + varNames[1] + " = \"" + makeRandomString() + "\"\n";  
        string += "let " + varNames[2] + " = \"" + makeRandomString() + "\"\n";  
        string += "let " + varNames[3] + " = \"" + makeRandomString() + "\"\n";  
        string += "let " + varNames[4] + " = \"" + makeRandomString() + "\"\n";  
        string += "let " + varNames[5] + " = \"" + makeRandomString() + "\"\n";  
    return string;
    }

}

 










