import React from 'react';
import Button from './Button';
import Display from './Display';

const buttonValues = [
    '1', '2', '3', 'Add (+)',
    '4', '5', '6', 'Subtract (-)',
    '7', '8', '9', 'Multiply (*)',
    'Clear', '0', '=', 'Divide (/)'
];


class Calculator extends React.Component {

    state = {
        calculationResult: 0,
        calculationInputs: [],
        stack: [],
        prevOperation: '',
        scientificMode: false,
        pressedKey: 0
    }

    // componentDidMount() {
    //     console.log(this.state, 'DidMount');
    // }

    // componentDidUpdate() {
    //     console.log(this.state, 'DidUpdate');
    // }

    registerInputNumber(clickedButton) {
        let currentStack = this.state.stack;
        currentStack.push(clickedButton);
        let value = currentStack.reduce((x, y) => x + y);
        this.setState({ stack: currentStack, calculationResult: value, prevOperation: 'number' });
    }

    calculateResultValue(clickedButton) {
        if (this.state.prevOperation !== 'number') {
            this.setState({ calculationResult: 'ERROR! PLEASE START OVER.' });
            return;
        }
        let inputValues = this.state.calculationInputs;
        inputValues.push(this.state.calculationResult);
        let result;
        // console.log(this.state.calculationInputs);
        if (clickedButton === '=') {
            result = eval(this.state.calculationInputs.join(' '));
            this.setState({ calculationResult: result.toString(), calculationInputs: [] });
            return;
        }
        if (inputValues.length > 1) {
            // console.log(this.state.calculationInputs, 'after equal');
            result = eval(this.state.calculationInputs.join(' '));
            inputValues = [result.toString()];
            this.setState({ calculationResult: result.toString() });
        }
        inputValues.push(clickedButton);
        this.setState({ stack: [], calculationInputs: inputValues, prevOperation: 'operator' });
    }

    handleButtonClick = (e) => {
        let clickedButton = e.target.value;
        switch (clickedButton) {
            case 'Clear':
                this.setState({ calculationResult: 0, calculationInputs: [], stack: [], prevOperation: '' });
                break;
            case 'Add (+)':
                this.calculateResultValue('+');
                break;
            case 'Subtract (-)':
                this.calculateResultValue('-');
                break;
            case 'Multiply (*)':
                this.calculateResultValue('*');
                break;
            case 'Divide (/)':
                this.calculateResultValue('/');
                break;
            case '=':
                this.calculateResultValue('=');
                break;
            default:
                this.registerInputNumber(clickedButton);
                break;
        };
    }

    toggleScientificMode = () => {
        this.setState(prevState => ({ scientificMode: !prevState.scientificMode }))
    }

    changeSign = () => {
        if (this.state.prevOperation !== 'number') {
            this.setState({
                calculationResult: 'ENTER VALID NUMBER'
            });
            return;
        }
        this.setState(prevState => ({
            calculationResult: -prevState.calculationResult,
            stack: [-prevState.calculationResult]
        }));
    }

    calculateRoot = () => {
        if (this.state.prevOperation !== 'number') {
            this.setState({
                calculationResult: 'ENTER VALID NUMBER'
            });
            return;
        }
        this.setState(prevState => ({
            calculationResult: Math.sqrt(prevState.calculationResult)
        }));
    }

    calculateSquare = () => {
        if (this.state.prevOperation !== 'number') {
            this.setState({
                calculationResult: 'ENTER VALID NUMBER'
            });
            return;
        }
        this.setState(prevState => ({
            calculationResult: prevState.calculationResult ** 2,
            stack: [prevState.calculationResult ** 2]

        }));
    }

    onKeyPressHandler = (e) => {
        console.log('1----keypressed',e.charCode);
        if (e.charCode === 45 || e.charCode === 43) e.preventDefault();
        
        switch (e.charCode) {
            case 42:
                this.calculateResultValue('*')
                break;
            case 45:
                this.calculateResultValue('-')
                break;
            case 43:
                this.calculateResultValue('+')
                break;
            case 47:
                this.calculateResultValue('/')
                break;
            case 61:
                this.calculateResultValue('=')
                break;
            default:
                break;
        }
        
        this.setState({
            pressedKey: e.key
        });
    }

    handleInputChange = () => {
        console.log('2----change');
        // console.log('charCode->',e.charCode,'shift', e.shiftKey,'key -> ',e.key,'keyCode',e.keyCode);
        this.registerInputNumber(this.state.pressedKey);        
    }

    render() {

        let buttonConfig = buttonValues.map((el, i) => (
            <Button buttonClicked={this.handleButtonClick} key={i} value={el}></Button>
        ))

        let scientificMode = this.state.scientificMode ?
            (
                <div className="scientific-buttons-wrapper">
                    <Button buttonClicked={this.changeSign} value="Sign Button"></Button>
                    <Button buttonClicked={this.calculateRoot} value="Square Root"></Button>
                    <Button buttonClicked={this.calculateSquare} value="Square"></Button>
                </div>
            )
            : null

        // console.log(this.state);
        return (
            <div>
                <h1>Calculator </h1>
                <br />
                <Display result={this.state.calculationResult} keyPress={this.onKeyPressHandler} handleChange={this.handleInputChange}></Display>
                <br />
                <div className="button-wrapper">
                    {buttonConfig}
                </div>
                {scientificMode}
                <button onClick={this.toggleScientificMode}>Scientific Mode</button>
            </div>
        )
    }
}

export default Calculator;