import React, { Component } from 'react';
import './App.css';
import Chart from './Chart.js';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        
        <header className="App-header">
        <div className="headline">
          <h1>Skillmatrix Profil</h1>
          <h3>Max Mustermann</h3>
          
            {/* use the Chart component from Chart.js */}
            <Chart/>
    
        </div>
        </header>
      </div>
    );
  }
}

export default App;
