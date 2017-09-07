import React, {Component} from 'react';
import Posts from './Posts';


class BlogBody extends Component {
  render(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <Posts/>
              <hr/>
              <div className="clearfix">
                <a className="btn btn-secondary float-right" href="#">Older Posts &rarr;</a>
              </div>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}


export default BlogBody;
