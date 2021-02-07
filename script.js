class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  // to delele all input
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  //to delete single input from the end 
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  // to add number to screen
    appendNumber(number) {
     
      //to avoid the user wirte more than one dot(.)
    
      if (number === '.' && this.currentOperand.includes('.')) return
  //to be able to write more than single input we can add two or more inside other ,we use toString to do this
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      //He check if there input in the screen ot not
      //بفحض انو في ارقام مدخلة على الشاشة عشان يقوم بالعمليات اللازمة
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      // اول اشي عشان يظهر العمليات الحسابية على الشاشة 
      // تاني اشي بخلي القيمة الي دخلها الاولى هي الحالية 
      // بفضي الشاشة لرقم التاني الي بدو يدخل
      //He show the operation that use chose it in the screen
      //then make the pervious the current value
      // He delete the current to be able to add new number
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
    
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev /current
          break
          case '$ to sk':
         computation = prev /3.2887
            break
         case 'sk to $':
          computation = prev *3.2887
          break
          case 'Euros to sk':
          computation = prev /3.9622
         break
         case 'sk to Euros':
         computation = prev *3.9622
         break
        default:
          return
      }
      this.currentOperand = computation // this the output
      this.operation = undefined //
      this.previousOperand = ''
    }
  
  // to be able make more than more operation
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.currentOperand
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.previousOperand} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  //when click at numbers button
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  // when click at operation buttons
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  //equal button 
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
 // AC button
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  //delete butttom
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })