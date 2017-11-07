import React, {Component} from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignupForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConformation: '',
      timezone: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join our Community</h1>

        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input onChange={this.onChange} value={this.state.username} type='text' name='username' className='form-control'/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Email</label>
          <input onChange={this.onChange} value={this.state.email} type='text' name='email' className='form-control'/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Password</label>
          <input onChange={this.onChange} value={this.state.password} type='text' name='password' className='form-control'/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Password Conformation</label>
          <input onChange={this.onChange} value={this.state.passwordConformation} type='text' name='passwordConformation' className='form-control'/>
        </div>

        <div className='form-group'>
          <label className='control-label'>Timezone</label>
          <select onChange={this.onChange} value={this.state.timezone} type='text' name='timezone' className='form-control'>
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

export default SignupForm;
