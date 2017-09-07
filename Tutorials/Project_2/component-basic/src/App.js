import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.yourname = "Andres"
        this.state = {};
    }

    sayhello(name) {
        return "Hello " + name;
    }

    timeTick() {
        const element = (
            <div>
                <h1>The time is:</h1>
                <h2>{new Date().toLocaleTimeString()}</h2>
            </div>

        );
        ReactDOM.render(element, document.getElementById('time'));
    }

    render() {
        const myName = "Andres"
        return (
            <div className="App">
                <h2>Just some sample data: {this.sayhello(this.yourname)}</h2>
                {setInterval(this.timeTick, 1000)}
            </div>
        );
    }
}

export default App;
