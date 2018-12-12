import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccSettings from '@material-ui/icons/Settings';
import Help from '@material-ui/icons/HelpOutlined';
import { withStyles } from '@material-ui/core/styles';
import '../Watcher/Start.css';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    welcomeText: {
      marginLeft: -12,
      marginRight: 20,
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
            <div className={classes.root}>
                <AppBar position="static" id='header-background'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.grow} id = 'HCL-Dashboard'>
                           <span id = 'text-style-1'>HCL</span> DevSecOps
                        </Typography>
                        <div>
                            <IconButton color="inherit">
                            <AccSettings/>
                            </IconButton>
                            
                        
                        <IconButton color="inherit">
                            <Help/>
                        </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MenuAppBar);