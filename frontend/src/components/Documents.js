import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MUI :(
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import MeetingScheduler from './MeetingScheduler';

// Some actions
import {
  postNewDoc,
  deleteSelectedDoc,
  fetchDocuments,
} from '../actions/documentActions';

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

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '80vh',
    width: '60vw',
    marginTop: '10vh',
    marginLeft: '35vh',
    marginBottom: '10vh',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class DocumentCard extends React.Component {
  state = {
    value: 0,
    modalOpen: false,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, docs } = this.props;
    const { value } = this.state;
    const docsObj = {};
    if (docs.docs) {
      docs.docs.map(doc => {
        let doctemp = docsObj[doc.template_link] || [];
        docsObj[doc.template_link] = [...doctemp, doc];
      });
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Project Documents
          </Typography>
          <CardActions>
            <Button onClick={() => this.handleOpen()}>
              Schedule A Meeting
            </Button>
            <Modal open={this.state.modalOpen} onClose={this.handleClose}>
              <div className={classes.container}>
                <div>
                  <MeetingScheduler />
                </div>
              </div>
            </Modal>
          </CardActions>
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
            <TabContainer>
              <List>
                {docsObj[value + 1] ? (
                  docsObj[value + 1].map(somedoc => (
                    <ListItem key={somedoc.document_id}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={somedoc.document_title}
                        secondary={somedoc.document_id}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Delete"
                          onClick={() =>
                            this.props.deleteDocument(somedoc.document_id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <div>Nothing here \ (•◡•) /</div>
                )}
              </List>
            </TabContainer>
          </div>
        </CardContent>
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.array,
  deleteDocument: PropTypes.func,
  postDocument: PropTypes.func,
  fetchProjectDocs: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    docs: state.documents,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectDocs: () => {
      return dispatch(fetchDocuments());
    },
    postDocument: payload => {
      return dispatch(postNewDoc(payload));
    },
    deleteDocument: docId => {
      return dispatch(deleteSelectedDoc(docId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DocumentCard));
