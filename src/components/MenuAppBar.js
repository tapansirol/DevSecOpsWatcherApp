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
                <AppBar position="static" style={{ backgroundColor: '#145da1' }}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            HCL DevSecOps
                        </Typography>

                        <Typography variant="body2" color="inherit" className={classes.welcomeText}>
                            Welcome, Administrator
                        </Typography>

                        <div>
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            >
                                <AccSettings/>
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                        <IconButton color="inherit">
                            <Help/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(MenuAppBar);