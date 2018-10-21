import React, { Component } from 'react';
import { Ghost } from 'react-kawaii';

const styles = {
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#162630',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  message: {
    color: 'white',
    fontSize: '5vw',
    fontFamily: 'K2D, sans-serif',
    marginTop: '20px',
  },
};

export default class NotFound extends Component {
  render() {
    return (
      <div style={styles.root}>
        <div>
          <Ghost size={240} mood="shocked" color="#00af5b" />
        </div>
        <div style={styles.message}>{`4 O 4 ¯\_(ツ)_/¯`}</div>
      </div>
    );
  }
}
