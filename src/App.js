import {useState} from "react";
import './App.scss';

function App() {
  const[display, setDisplay] = useState("0");
  const[isNewCalculation, setIsNewCalculation] = useState(true);

  const ourNumber = (event)=>{
    const number = event.target.textContent;
    if(isNewCalculation || display==="0"){
      setDisplay(number);
      setIsNewCalculation(false);
    }
    else{
      setDisplay(display+number);
    } 
  };
  
  const ourOperator = (event) => {
    const operator = event.target.textContent;
    let currentDisplay = display.trim();
  
    // Start new calculation with the last result and the new operator
    if (isNewCalculation) {
      setDisplay(currentDisplay + " " + operator + " ");
      setIsNewCalculation(false);
      return;
    }
  
    // Replace the last operator if another operator is entered
    if (['+', '-', '*', '/'].includes(currentDisplay.slice(-1))) {
      // Check if it's a negative number case
      if (operator === '-' && !['+', '-', '*', '/'].includes(currentDisplay.slice(-2, -1))) {
        setDisplay(currentDisplay + " " + operator);
      } else {
        currentDisplay = currentDisplay.slice(0, -1);
        setDisplay(currentDisplay + operator);
      }
    } else {
      setDisplay(currentDisplay + " " + operator + " ");
    }
  };

  const ourEqual = () => {
    try {
      const evaluated = eval(display.replace(/ /g, ''));
      setDisplay(String(evaluated));
    } catch (error) {
      setDisplay("Error");
    }
    setIsNewCalculation(true);
  }
  
  const ourDecimal = () =>{
    const array = display.split(/\s+/);
    const lastElement = array[array.length-1];
    if(isNewCalculation){
      setDisplay("0.");
      setIsNewCalculation(false);
    }
    else if(lastElement==="" || ['+', '-', '*', '/'].includes(lastElement)){
      setDisplay(display+"0.");
    }
    else if(!lastElement.includes(".")){
      setDisplay(display + ".");
    }
  }

  const ourClear=()=>{
    setDisplay("0");
    setIsNewCalculation(true);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" class="row">{display}</div>
        <div id="clear" class="row" onClick={ourClear}>AC</div>
        <div id="seven" onClick={ourNumber}>7</div>
        <div id="eight" onClick={ourNumber}>8</div>
        <div id="nine" onClick={ourNumber}>9</div>
        <div id="divide" onClick={ourOperator}>/</div>
        <div id="four" onClick={ourNumber}>4</div>
        <div id="five" onClick={ourNumber}>5</div>
        <div id="six" onClick={ourNumber}>6</div>
        <div id ="multiply" onClick={ourOperator}>*</div>
        <div id="one" onClick={ourNumber}>1</div>
        <div id="two" onClick={ourNumber}>2</div>
        <div id="three" onClick={ourNumber}>3</div>
        <div id="subtract" onClick={ourOperator}>-</div>
        <div id="zero" onClick={ourNumber}>0</div>
        <div id="equals" onClick={ourEqual}>=</div>
        <div id="decimal" onClick={ourDecimal}>.</div>      
        <div id="add" onClick={ourOperator}>+</div>      
      </div>
    </div>
  );
}

export default App;
