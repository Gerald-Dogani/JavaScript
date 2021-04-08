const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

//calculate first and second value depending on operator
const calculate = {
    '/':(firstNumber,secondNumber)=> firstNumber / secondNumber,

    '*':(firstNumber,secondNumber)=> firstNumber * secondNumber,

    '+':(firstNumber,secondNumber)=> firstNumber + secondNumber,
    
    '-':(firstNumber,secondNumber)=> firstNumber - secondNumber,

    '=':(firstNumber,secondNumber)=> secondNumber
  
} ;

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number){
   //replace current display value if first value is entered
   if (awaitingNextValue){
       calculatorDisplay.textContent = number;
       awaitingNextValue = false;
   }else{
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue ==='0' ? number : displayValue + number;
   }
}

function addDecimal(){
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
//calculator first and second value depending on value

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent muliple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    //asign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    } else {
       
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //ready for the next value
    awaitingNextValue = true;
    operatorValue= operator;
    
}

//reset all values, display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';

}

//add event listener for numbers, operator , decimal
inputBtns.forEach((inputBtn) =>{
    if (inputBtn.classList.length===0){
        inputBtn.addEventListener('click',() => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal());
    }

});

//event listener
clearBtn.addEventListener('click', resetAll)
