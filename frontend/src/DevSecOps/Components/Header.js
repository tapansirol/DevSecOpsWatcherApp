import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccSettings from '@material-ui/icons/Settings';
import Help from '@material-ui/icons/HelpOutlined';
import { withStyles } from '@material-ui/core/styles';
import '../Watcher/Start.css';

const styles = {
    grow: {
      flexGrow: 1,
    }
};

class MenuAppBar extends Component {
    state = {
        anchorEl: null
      };
    
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <div>
                <AppBar position="static" id='header-background'>
                    <Toolbar id='toolbar-style'>
                        <Typography variant="title" color="inherit" className={classes.grow} id = 'HCL-Dashboard'>
                           <span id = 'text-style-1'>HCL</span> Watcher
                        </Typography>
                            <AccSettings id='icon-button-style'/>
                            <Help id='icon-button-style'/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MenuAppBar);