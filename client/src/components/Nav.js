import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from '../Auth';
import '../App.css';

class Nav extends Component {

  constructor(props){
    super(props);
  }

  logout = () => {
    auth.logout();
    this.props.history.replace('/');
  };

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">COOL READS</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">All Book Ratings</Link>
          </li>
          <li>
            {
              ( auth.isAuthenticated() ) ? <Link to="/create">Upload a Rated Book</Link> :  ''
            }
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {
             (auth.isAuthenticated()) ? (<button className="btn btn-danger log" onClick={() => this.logout()}>Log out </button>) : (<button className="btn btn-info log" onClick={() => auth.login()}>Log In</button>)
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);