import { Component } from "react";
import Button from "../button/Index";
import "./index.css";
import Display from "../display/Index";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = (operation) => {
    const { current, operation: currentOperation, values } = this.state;
    const equals = operation === "=";
    const newValues = [...values];

    try {
      newValues[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
    } catch (e) {
      newValues[0] = values[0];
    }

    newValues[1] = 0;

    this.setState({
      displayValue: String(newValues[0]),
      operation: equals ? null : operation,
      current: equals ? 0 : 1,
      clearDisplay: !equals,
      values: newValues,
    });
  };

  addDigit = (n) => {
    const { displayValue, clearDisplay, current, values } = this.state;

    if (n === "." && displayValue.includes(".")) {
      return;
    }

    const currentValue = clearDisplay ? "" : displayValue;
    const newDisplayValue = currentValue + n;

    this.setState({
      displayValue: newDisplayValue,
      clearDisplay: false,
    });

    if (n !== ".") {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...values];
      newValues[current] = newValue;

      this.setState({ values: newValues });
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
