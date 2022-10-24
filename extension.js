// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const da_words_json = require('./words_dictionary.json')

const { resolve } = require('path');
const internal = require('stream');
const { getTextOfJSDocComment } = require('typescript');
const vscode = require('vscode');

// This method is called when your extension is activated. So be careful with it.
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
	let disposable = vscode.commands.registerCommand('monkeyType.monkey', function () {
		// The code you place here will be executed every time your command is executed
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
    var text = makeDefaultVars();
    var indent = "";
    var depth = 0;
    var maxDepth = 7;
    var operators = ["+", "-", "/", "*", "^"]
    var comperatorOperators = ["==", "!=", ">", "<", ">=", "<=", "===", "!=="]

    generateCode();
    generateOutput();
    return text;

    function generateCode(){
        for (let ii = 0; ii < 2; ii ++ ){

        let randNum = Math.random() 

        //Generate new variable
        if (randNum < 0.5){
            let tmp = makeRandomString();
            varNames.push(tmp)
            text += indent + "var " + tmp + " = " + makeRandomInt(10) + ";\n"; 

        //Generate new calculation
        } else if (randNum > 0.5) {     
            let newVar = makeRandomString()
            varNames.push(newVar)
            text += indent + newVar + " = ";
            text += generateCalculation();
            text += "\n"
        }


        randNum = Math.random()

        //Generate new function
        if (randNum < 0.3){
            if (depth < maxDepth){
                depth++;
                generateFunction();
            }
        //Generate new If-Clause
        } else if (randNum < 0.6){
            if (depth < maxDepth){
                depth++;
                let var1 = makeRandomInt(varNames.length);
                let var2 = makeRandomInt(varNames.length);
                text += indent + "if  (" + varNames[var1] + " " + getComperatorOperator() + " " + varNames[var2]  + "){\n"
                indent += "    "
                generateCode()
                indent = indent.slice(0, indent.length - 4)
                text += indent + "}\n\n"
            }
        }
    }
    }

    function generateCalculation(){
        let tmpText = "";
        let maxI = makeRandomInt(2) + 2
            for (let i = 0; i < maxI; i++){
                var tmpNum = makeRandomInt(varNames.length);
                tmpText += varNames[tmpNum] + " " + getOperator() + " ";
            }
            var tmpNum = makeRandomInt(varNames.length);
            tmpText += varNames[tmpNum]
        return tmpText;
    }

    function getComperatorOperator(){
        return comperatorOperators[makeRandomInt(operators.length)]
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
        varNames = [makeRandomString(),makeRandomString(),makeRandomString()]
        let string = "var " + varNames[0] + " = " + makeRandomInt(1342340) + "\n"
        string += "var " + varNames[1] + " = " + makeRandomInt(12132342311340) + "\n";  
        string += "var " + varNames[2] + " = " + makeRandomInt(12132340) + "\n"; 
    return string;
    }

    function generateFunction(){
        let functionName = makeRandomString();
        varNames.push(functionName + "()");
        //Don't Execute the Command right away. This is Stupid. Not like the Rest. (Wich is veeery Smart)
        //text += indent + functionName + "()\n" // text += functionName + "()\n"
        text += indent + "function " + functionName + "(){\n"
        indent += "    "
        generateCode()
        text += indent + "return " + generateCalculation() + "\n"
        indent = indent.slice(0, indent.length - 4)
        text += indent + "}\n\n"
    }

    function getOperator(){
        return operators[makeRandomInt(operators.length)]
    }

    function generateOutput(){
        text += "alert("
        let maxI = makeRandomInt(3) + 2

            for (let i = 0; i < maxI; i++){
                var tmpNum = makeRandomInt(varNames.length);
                text += varNames[tmpNum] + " " + getOperator() + " ";
            }

            var tmpNum = makeRandomInt(varNames.length);
            text += varNames[tmpNum] + ")";
    }

}

 










