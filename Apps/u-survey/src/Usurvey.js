import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');
var config = {
  apiKey: "AIzaSyAOEdIpU1u9E61PLOhQdQXxF3aqhC7LY0w",
  authDomain: "u-survey-6ef16.firebaseapp.com",
  databaseURL: "https://u-survey-6ef16.firebaseio.com",
  projectId: "u-survey-6ef16",
  storageBucket: "u-survey-6ef16.appspot.com",
  messagingSenderId: "795909358318"
};
firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({
      studentName: studentName
    }, function() {
      console.log(this.state);
    });
  }

  answerSelected(event) {
    var answers = this.state.answers;
    if (event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    } else if (event.target.name === 'answer2') {
      answers.answer2 = event.target.value;
    } else if (event.target.name === 'answer3') {
      answers.answer3 = event.target.value;
    }

    this.setState({
      answers: answers
    }, function() {
      console.log(this.state);
    });
  }

  questionSubmit(event) {
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  render() {
    var studentName;
    var questions;

    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1>Hi student, what is your name?</h1>
        <form onSubmit={this.nameSubmit}>
          <input className='name' type='text' placeholder='Enter your name' ref='name'/>
        </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Hey there, welcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions:
        </h2>
        <form onSubmit={this.questionSubmit}>
          <div className='card'>
            <label>What kind of course appeal to you the most?</label>
            <br/>
            <input type='radio' name='answer1' value='Tech' onChange={this.answerSelected}/>Tech
            <input type='radio' name='answer1' value='Design' onChange={this.answerSelected}/>Design
            <input type='radio' name='answer1' value='Marketing' onChange={this.answerSelected}/>Marketing
          </div>
          <div className='card'>
            <label>You are a:
            </label>
            <br/>
            <input type='radio' name='answer2' value='Student' onChange={this.answerSelected}/>Student
            <input type='radio' name='answer2' value='In-job' onChange={this.answerSelected}/>In-job
            <input type='radio' name='answer2' value='Looking for job' onChange={this.answerSelected}/>Looking for job
          </div>
          <div className='card'>
            <label>Is online learning helpful?</label>
            <br/>
            <input type='radio' name='answer3' value='Yes' onChange={this.answerSelected}/>Yes
            <input type='radio' name='answer3' value='No' onChange={this.answerSelected}/>No
            <input type='radio' name='answer3' value='Maybe' onChange={this.answerSelected}/>Maybe
          </div>
          <input className='feedback-button' type='submit' value='submit'/>
        </form>
      </div>
    } else if (this.state.isSubmitted === true && this.state.studentName !== '') {
      studentName = <h1>Thanks, {this.state.studentName}</h1>;
    }

    return (
      <div>
        {studentName}
        ==============================================
        {questions}
      </div>
    );
  }
}

export default Usurvey;
