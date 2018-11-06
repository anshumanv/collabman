import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MUI :(
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Typography from '@material-ui/core/Typography';

// Some icons :)
import { IoIosPeople } from 'react-icons/io';

const styles = {
  card: {
    minWidth: 275,
    marginTop: '20px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class TeamCard extends Component {
  render() {
    const { classes, currentProject } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    let team = [];
    if (currentProject) {
      team = currentProject.users;
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            <IoIosPeople size="2em" style={{ marginRight: '10px' }} />
            Team
          </Typography>
          <div className={classes.row}>
            {team.map(member => (
              <Avatar key={member} className={classes.avatar}>
                {member}
              </Avatar>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  currentProject: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    currentProject: state.projects.currentProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TeamCard));
