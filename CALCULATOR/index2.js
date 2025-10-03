
document.addEventListener('DOMContentLoaded', () => {

    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.btn');
    const addButton = document.getElementById('btnadd');
    const subtractButton = document.getElementById('btn-');
    const multiplyButton = document.getElementById('btn*');
    const divideButton = document.getElementById('btn/');
    const acButton = document.getElementById('btnAC');
    const equalsButton = document.getElementById('btn=');

    let currentExpression = '';
    let isResultDisplayed = false;

    display.textContent = '0';

    function appendNumber(number) {
        if (isResultDisplayed) {
            currentExpression = '';
            isResultDisplayed = false;
        }
        if (currentExpression === '0') {
            currentExpression = number;
        } else {
            currentExpression += number;
        }
        updateDisplay();
    }

    function appendOperator(operator) {
        isResultDisplayed = false;
        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + operator;
        } else if (currentExpression !== '') {
            currentExpression += operator;
        }
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentExpression || '0';
    }

    function clearDisplay() {
        currentExpression = '';
        isResultDisplayed = false;
        updateDisplay();
    }

    function calculate() {
        if (currentExpression === '' || isResultDisplayed) return;
        try {
            const result = new Function('return ' + currentExpression)();
            currentExpression = result.toString();
            isResultDisplayed = true; 
            updateDisplay();
        } catch (error) {
            currentExpression = '';
            display.textContent = 'Error';
            isResultDisplayed = true;
        }
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    addButton.addEventListener('click', () => appendOperator('+'));
    subtractButton.addEventListener('click', () => appendOperator('-'));
    multiplyButton.addEventListener('click', () => appendOperator('*'));
    divideButton.addEventListener('click', () => appendOperator('/'));

    acButton.addEventListener('click', clearDisplay);

    equalsButton.addEventListener('click', calculate);
});
