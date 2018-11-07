import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';

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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import MeetingScheduler from './MeetingScheduler';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

// Some actions
import {
  postNewDoc,
  deleteSelectedDoc,
  fetchDocuments,
} from '../actions/documentActions';

// Some icons :)
import { FaNewspaper } from 'react-icons/fa';

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
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
  },
});

class DocumentCard extends React.Component {
  state = {
    value: 0,
    meetingModal: false,
    docTitle: '',
    docLink: '',
    newDocDialog: false,
  };

  handleOpen = () => {
    this.setState({ meetingModal: true });
  };

  handleClose = () => {
    this.setState({ meetingModal: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  openNewDocDialog = () => {
    this.setState({ newDocDialog: true });
  };

  closeNewDocDialog = () => {
    this.setState({ newDocDialog: false });
  };

  handleFormUpdates = (event, input) => {
    if (event.target.id === 'document-title')
      this.setState({ [input]: event.target.value });
    else if (event.target.id === 'document-content')
      this.setState({ [input]: event.target.value });
  };

  postNewDocument = template_link => {
    const payload = {
      document_title: this.state.docTitle,
      document_link: this.state.docLink,
      template_link: template_link + 1,
    };
    this.props.postDocument(payload);
    this.closeNewDocDialog();
  };

  deleteDocConfirmation = docId => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteDocument(docId);
        swal('Poof! Document has been deleted!', {
          icon: 'success',
        });
      }
    });
  };

  render() {
    const { classes, docs, profile, currentProject } = this.props;
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
          <div className={classes.heading}>
            <Typography className={classes.title} color="textSecondary">
              <FaNewspaper style={{ marginRight: '10px' }} size="2em" />
              Project Documents
            </Typography>
            <CardActions>
              <Button onClick={() => this.handleOpen()}>
                Schedule A Meeting
              </Button>
              <Modal open={this.state.meetingModal} onClose={this.handleClose}>
                <div className={classes.container}>
                  <div>
                    <MeetingScheduler />
                  </div>
                </div>
              </Modal>
            </CardActions>
            <Button
              variant="fab"
              mini
              color="primary"
              aria-label="Add"
              className={classes.button}
              onClick={this.openNewDocDialog}
            >
              <AddIcon />
            </Button>
            <Dialog
              open={this.state.newDocDialog}
              onClose={this.closeNewDocDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                New Document in {value}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the document details
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="document-title"
                  onChange={e => this.handleFormUpdates(e, 'docTitle')}
                  label="Document Title"
                  type="text"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="document-content"
                  onChange={e => this.handleFormUpdates(e, 'docLink')}
                  label="Document Link"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeNewDocDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => this.postNewDocument(value)}
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
                        secondary={
                          <a
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            href={somedoc.document_link}
                          >
                            {`Open`}
                          </a>
                        }
                      />
                      {currentProject &&
                        profile &&
                        (currentProject.project_manager === profile.id ? (
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="Delete"
                              onClick={() =>
                                this.deleteDocConfirmation(somedoc.document_id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        ) : (
                          ''
                        ))}
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
  docs: PropTypes.object,
  deleteDocument: PropTypes.func,
  postDocument: PropTypes.func,
  fetchProjectDocs: PropTypes.func,
  currentProject: PropTypes.obj,
  profile: PropTypes.obj,
};

const mapStateToProps = state => {
  return {
    docs: state.documents,
    currentProject: state.projects.currentProject,
    profile: state.auth.profile,
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
