import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import timezones from '../../data/timezones';
import PropTypes from 'prop-types';
import map from 'lodash/map';


class SignupForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConformation: '',
      timezone: '',
      loggedIn: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  passwordsMatch(){
    return (this.state.password === this.state.passwordConformation);
  }

  onSubmit(e){
    e.preventDefault();
    if(this.passwordsMatch()){
      this.props.userSignupRequest(this.state)
      .then(() =>{
        this.setState({loggedIn: true});
      })
      .catch(e => {
        console.log(e);
        alert(e.data)
      });
    }
    else{
      alert('Passwords do not Match');
    }
  }

  render(){
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    if(this.state.loggedIn){
      return <Redirect to="/dashboard"/>
    }

    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join our Community</h1>

        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input onChange={this.onChange} value={this.state.username} type='text' name='username' className='form-control' required/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Email</label>
          <input onChange={this.onChange} value={this.state.email} type='text' name='email' className='form-control' required/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Password</label>
          <input onChange={this.onChange} value={this.state.password} type='password' name='password' className='form-control' required/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Password Conformation</label>
          <input onChange={this.onChange} value={this.state.passwordConformation} type='password' name='passwordConformation' className='form-control' required/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Timezone</label>
          <select onChange={this.onChange} value={this.state.timezone} type='text' name='timezone' className='form-control' required>
            <option value='' disabled>Choose Your Timezone</option>
            {options}
          </select>
        </div>

        <div className='form-group'>
          <button className='btn btn-primary btn-lg'>Sign up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;
