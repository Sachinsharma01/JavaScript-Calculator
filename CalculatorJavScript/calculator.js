function getHistory() {
    return document.getElementById("history-values").innerText;
}
function printHistory(num) {
    document.getElementById("history-values").innerText=num;
}
function getOutput() {
    return document.getElementById("output-values").innerText;
}
function printOutput(num) {
    if (num == ""){
        document.getElementById("output-values").innerText=num;
    }
    else {
        document.getElementById("output-values").innerText=getFormattedNumber(num);
    }
}
function getFormattedNumber(num) {
    var n = Number (num);
    return n.toLocaleString("en");
}
function reverseFormat(num) {
    if (num == "-") {
        return "";
    }
    return Number (num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0;i < operator.length;i++) {
    operator[i].addEventListener('click', function(){
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        if (this.id == "back") {
            var output = reverseFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length])) {
                    history = history.substr(0, history.length - 1);
                }
            } 
            if (output != "" || history != "") {
                output = output==""?output:reverseFormat(output);
                // output = reverseFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseFormat(getOutput());
        if (output != NaN) { // object is not a number (NaN)
            output = output + this.id;
            printOutput(output);
        }
    });
}
