import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

class App extends React.Component {

  state = {
    theme: 'app light'
  }
  
  toggleThemeDark = () => {    
      this.setState({theme: 'app dark'});
  }

  toggleThemeLight = () => {
    this.setState({theme: 'app light'});
  }
  
  render() {
    return (
      <div className="calculator-wrapper">
        <div className={this.state.theme}>
          <Calculator></Calculator>
          <button onClick={this.toggleThemeLight}>Light Theme</button>
          <button onClick={this.toggleThemeDark}>Dark Theme</button>
        </div>
      </div>
    );
  }
}

export default App;
