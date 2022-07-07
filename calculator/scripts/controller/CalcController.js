class CalcController{

    constructor(){
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#time');
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();
    }

    async copyToClipboard() {
        await navigator.clipboard.writeText(this.displayCalc)
    }
 
    async pasteFromClipboard() {
        let text = await navigator.clipboard.readText();
        this.displayCalc = parseFloat(text);
    }

    initialize() {
        this.setDisplayDateTime();
        
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);        

        this.setLastNumberToDisplay();
    }

    initKeyboard(){
        document.addEventListener('keyup', e=> {
            switch(e.key){
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calculate();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
                case 'v':
                    if(e.ctrlKey) this.pasteFromClipboard();
                    break;
            }
        });
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError(){
        this.displayCalc = "Error";
    }

    getLastItem(){
        return this._operation[this._operation.length-1];
    }

    setLastItem(value){
        this._operation[this._operation.length-1] = value;
    }

    pushItem(value){
        this._operation.push(value);
        if(this._operation.length > 3){
            this.calculate();
        }
    }

    concatenateOperation(){
        return this._operation.join('');
    }

    getResult(){
        return eval(this.concatenateOperation());
    }

    calculate(){
        let lastItem = '';
        this._lastOperator = this.getLastNumberOrOperator();

        if(this._operation.length < 3) {
            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3) {
            lastItem = this._operation.pop();

            this._lastNumber = this.getResult();
        } else if(this._operation.length == 3){
            this._lastNumber = this.getLastNumberOrOperator(false);
        }
        
        let result = this.getResult();

        if(lastItem == '%'){
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if(lastItem) this._operation.push(lastItem);
        }
        this.setLastNumberToDisplay();
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    getLastNumberOrOperator(isOperator = true) {
        let lastNumberOrOperator;

        for(let i = this._operation.length-1; i >= 0; i--){
        
            if(this.isOperator(this._operation[i]) == isOperator){
                lastNumberOrOperator = this._operation[i];
                break;
            }
        }

        if (!lastNumberOrOperator){
            lastNumberOrOperator = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastNumberOrOperator;
    }

    addDot(){
        let lastItem = this.getLastItem();

        if (typeof lastItem === 'string' && lastItem.split('').indexOf('.') > -1) return;
        
        if(this.isOperator(lastItem) || !lastItem){
            this.pushItem('0.');
        } else {
            this.setLastItem(lastItem.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
        let lastNumber = this.getLastNumberOrOperator(false);
        if(!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    addOperation(value){
        if(isNaN(this.getLastItem())){
            if(this.isOperator(value)){
                //last isnt a number and value is a operator
                this.setLastItem(value);
            } else {
                //last isnt a number and value is a number
                this.pushItem(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if(this.isOperator(value)){
                //last is a number and value is a operator
                this.pushItem(value);
            } else {
                //last is a number and value is a number
                let newValue = this.getLastItem().toString() + value.toString();
                this.setLastItem(newValue);
                this.setLastNumberToDisplay();
            }
        }
    }

    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'plus':
                this.addOperation('+');
                break;
            case 'minus':
                this.addOperation('-');
                break;
            case 'times':
                this.addOperation('*');
                break;
            case 'divided':
                this.addOperation('/');
                break;
            case 'percent':
                this.addOperation('%');
                break;
            case 'equals':
                this.calculate();
                break;
            case 'dot':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }


    initButtonsEvent(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}