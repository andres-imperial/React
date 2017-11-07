import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteTask} from '../../actions/';

export class Task extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.deleteTask = deleteTask.bind(this);
  }
  render() {
    console.log(this.props);
    return (
        <tr>
          <td>
            {this.props.task}
          </td>
          <td>
            <button onClick={() => {
                deleteTask(this.props.task)
                console.log('Hello');
              }}>Delete</button>
          </td>
        </tr>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteTask}, dispatch);
}
export default connect(null, mapDispatchToProps)(Task);
