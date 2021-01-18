// Dom elements
const formula = document.querySelector(".formula");
const display = document.querySelector(".calc-displays-display");
const number = document.querySelectorAll(".number");
const clean = document.querySelector(".clean");
const negative = document.querySelector(".negative");
const percent = document.querySelector(".percent");
const multiple = document.querySelector(".multiple");
const decimal = document.querySelector(".decimal");
const equal = document.querySelector(".equal");
const operator = document.querySelectorAll(".operator");

// Calculator app
const calculator = function() {
    let calculated = false;
    let previousAns = "";
    let start = 0; 
    display.value = 0; 
    
    const insert = function(insertNum) { 
        if (calculated == true) {
            formula.value = previousAns + insertNum;
            display.value = previousAns + insertNum;
        } else if (isNaN(display.value) == true) {
            formula.value += insertNum; 
            display.value = insertNum;
        } else if (display.value != "0" && isNaN(display.value) == false) {
            formula.value += insertNum;
            display.value += insertNum;
        } else if (display.value == "0" && insertNum != 0) {
            formula.value += insertNum;
            display.value = insertNum;
            }
        calculated = false;
        start = 0;
    }

    const insertDom = function(e) {
        let insertNum = e.target.value;
        insert(insertNum);
    }

    const operatorOf = function(op) {
        let lastChar = formula.value[formula.value.length-1];
        let origin = display.value;
        if (start < 2) { 
        display.value = op;
        if (calculated == true) {
        formula.value = previousAns+op;
        } else if (Number(origin) != NaN) {
            formula.value += op;
            } else if (op = "-" && /[+/*]/.test(lastChar) == true) {
            formula.value += op;           
            }
            calculated = false;
            start += 1;
        }
    }

    const operatorDom = function(e) {
        let op = e.target.value;
        operatorOf(op);
    }

    const cleanContent = function() {
        formula.value = "";
        display.value = 0;
        calculated = false;
        previousAns = "";
        start = 0;
    }

    const percentOf = function() {
        let percentform = eval(display.value+"/100").toString();
        let removelength = display.value.length; 
        display.value = percentform;
        formula.value = formula.value.slice(0, -removelength) + percentform; 
    }

    const negativeNumber = function() {
        if (Number(display.value) != "NaN") {
            if (Number(display.value) > 0) {
                let negative = "-" + display.value;
                let removelength = display.value.length; 
                formula.value = formula.value.slice(0,-removelength) + negative;
                display.value = negative; 
            } else if (Number(display.value) < 0) {
                let negative = display.value.slice(1, display.value.length);
                let removelength = display.value.length; 
                formula.value = formula.value.slice(0,-removelength) + negative;
                display.value = negative; 
            }
        }
    }

    const decimalOf = function() {
        if (display.value.indexOf(".") == -1) {
            formula.value = formula.value + ".";
            display.value = display.value + ".";
        }
    }

    const equalOf = function() {
        let expression = formula.value;
        let lastChar = expression[expression.length-1];
            while (isNaN(lastChar) == true) {       
                expression = expression.slice(0, -1);
                lastChar = expression[expression.length-1];
                }
        let answer = eval(expression);
        if (Number.isInteger(answer) == false) {       
            if (answer.toString().split(".")[1].length > 4)
            answer = answer.toFixed(4);
            }
        formula.value = expression + "=" + answer;
        display.value = answer;
        calculated = true;
        previousAns = answer.toString();
    }

    const back = function(e) {
        if (display.value != "0" && formula.value != "") {
            if (display.value.length == 1 && formula.value.length == 1){
                formula.value = "";
                display.value = 0;
            } else {
                formula.value = formula.value.slice(0,-1);
                display.value = display.value.slice(0,-1);
            }
        }
    }

    // Actions with the keyboard
    const numberKey = function(e) {
        // Maybe do it with a switch case
        if(e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || 
        e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' ||
        e.key == '9' || e.key == '0' || e.key == '.') insert(e.key);
        if(e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+') operatorOf(e.key);
        if (e.key == '%') percentOf();        
        if(e.key == 'Enter') equalOf();
        if (e.key == 'Backspace') back();
        if (e.key == '_') negativeNumber();
    }

    document.addEventListener('keydown', numberKey);
    // Actions by Dom
    number.forEach(btn => btn.addEventListener('click', insertDom)); 
    operator.forEach(operator => operator.addEventListener('click', operatorDom));
    clean.addEventListener('click', cleanContent);
    percent.addEventListener('click', percentOf);
    negative.addEventListener('click', negativeNumber);
    decimal.addEventListener('click', decimalOf);
    equal.addEventListener('click', equalOf);
}

calculator();
