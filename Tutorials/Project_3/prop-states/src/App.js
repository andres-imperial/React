import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
                <h3>prop number is:{this.props.propNumber}</h3>
                <h3>prop string is:{this.props.propString}</h3>
                <h3>prop obj is:{this.props.propObject.obj1}</h3>
                <Parent/>
            </div>
        );
    }
}

App.propTypes = {
    propObject: PropTypes.object,
    propString: PropTypes.string,
    propNumber: PropTypes.number
}

App.defaultProps = {
    propNumber: 3,
    propString: "this is prop string",
    propObject: {
        obj1: "I am obj1",
        obj2: "I am obj2",
        obj3: "I am obj3"
    }
}

class Parent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: ['s-BMW', 's-Volks', 's-Toyota']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(prevState => ({cars: prevState.cars.reverse()}));
    }
    
    render() {
        return (
            <div>
                <h2 onClick={this.handleClick}>Just some info</h2>
                <Cars msg="cars are cool" model="12345" coolCars={this.state.cars}/>
            </div>
        );
    }
}

Parent.defaultProps = {
    words: 'Hello worlds',
    cars: ['BMW', 'Volks', 'Toyota']
}

class Cars extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h3>I am from cars comp</h3>
                <p>{this.props.msg}</p>
                <p>{this.props.model}</p>
                <div>{this.props.coolCars.map((item, i) => {
                        return <p key={i}>{item}</p>;
                    })}</div>
            </div>
        );
    }
}
export default App;
