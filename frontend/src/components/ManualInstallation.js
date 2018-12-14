import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import SideBar3 from './SideBar3';



const styles = theme =>({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 'auto',
      
    },
    progress: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#e7f3ff',
        height: '3.5rem'
      },
    


      card: {
        minWidth: 275,
        padding: 20,
      },
    
    
  });


class AutomatedToolChain extends Component{

   


    render()
    {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Card className={classes.card}>
                    <h4 align="center"><b>Tool chain Manual installation Steps</b></h4>
                    <Typography align="center">Follow the steps to complete the manual installation part of your toolchain.</Typography>
                    <SideBar3></SideBar3>
                        
                   
                </Card>
               
            </div>
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);