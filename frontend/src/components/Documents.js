import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
    marginTop: '20px',
  },
});

class DocumentCard extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Project Documents
          </Typography>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
              >
                <Tab label="Meetings" />
                <Tab label="Proposal" />
                <Tab label="Project Plan" />
                <Tab label="Misc" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                Meetings{' '}
                <Button href="/schedule_meeting" className={classes.button}>
                  Link
                </Button>
              </TabContainer>
            )}
            {value === 1 && <TabContainer>Proposal</TabContainer>}
            {value === 2 && <TabContainer>Plans go here</TabContainer>}
            {value === 3 && <TabContainer>Misc content</TabContainer>}
          </div>
        </CardContent>
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocumentCard);
