import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/Nav';
import Callback from './components/Callback';
import ListBook from './components/ListBook';
import CreateBook from './components/CreateBook';
import GuardedRoute from './components/GuardedRoute';
import './App.css';
import auth from './Auth';

class App extends Component {

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Route exact path='/' component={ListBook} />
        <GuardedRoute path='/create' component={CreateBook} />
        <Route exact path='/callback' component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
