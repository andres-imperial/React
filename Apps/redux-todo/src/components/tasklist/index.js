import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Task} from '../task/';

class Tasklist extends Component {
  render(){
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {this.props.tasks.map((task, index) => <Task  key={index} task={task} />)}
            </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(Tasklist);
