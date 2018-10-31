import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class AuthComplete extends React.Component {
  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/v1/github_token/')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <div>ahahah</div>;
  }
}

AuthComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthComplete);
