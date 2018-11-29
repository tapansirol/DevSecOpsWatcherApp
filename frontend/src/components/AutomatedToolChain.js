import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Test3 from './Test3';
import Test5 from './Test5';



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
        //align: 
        //marginLeft: 30
      },
    
    
  });


class AutomatedToolChain extends Component{

    constructor()
    {
        super();

    }


    render()
    {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Card className={classes.card}>
                    <h4 align="center"><b>Tool chain automated installation</b></h4>
                    <Typography align="center">The system is running some scripts for the automated installation part of your toolchain.</Typography>
                    <div style={{padding:20}}>
                        <Card className={classes.progress}>
                            <table align="center" style={{width:'40%'}} >
                                <tr style={{width:'100%'}}>
                                    <td align="right" style={{width:'50%'}}>
                                        <CircularProgress/>
                                    </td>
                                    <td align="center" style={{width:'50%'}}><Typography  id = "Installation-in-prog">Installation in Progress</Typography></td>
                                </tr>
                            </table>
                            
                        </Card>
                    </div>
                        <div style={{padding:20,width:'100%'}}>
                        <table align="center" style={{width:'100%',height:"3rem"}}>
                            <tr >
                                <td style={{width:'48%'}}><Test3/></td>
                                <td style={{width:'4%'}}></td>
                                <td style={{width:'48%'}}>
                                    <div style={{border: 'solid green',height:'100%',width: '100%',overflow:'scroll'}}>
                                        some text here...

                                    </div>
                                </td>
                            </tr>
                        </table>
                        </div>
                        
                   
                </Card>
               
            </div>
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);