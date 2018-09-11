import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import loading from '../loading.svg';
import auth from '../Auth';

class Callback extends Component {

  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default withRouter(Callback);