import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

// Sample data, use api to fethc stuff
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
	drawerPaper: {
	    position: 'relative',
	    width: drawerWidth,
	},
	drawerSection: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10px',
	},
	toolbar: theme.mixins.toolbar,
})

class Sidebar extends Component {
	render() {
		const { classes } = this.props;
		return(
			<Drawer
			  variant="permanent"
			  classes={{
			    paper: classes.drawerPaper,
			  }}
			>
			  <div className={classes.toolbar} />
				<div className={classes.drawerSection}>My Projects</div>
			  <List>{mailFolderListItems}</List>
			  <Divider />
			  <div className={classes.drawerSection}>Collaborating on</div>
			  <List>{otherMailFolderListItems}</List>
			</Drawer>
		)
	}
}

export default withStyles(styles)(Sidebar);
