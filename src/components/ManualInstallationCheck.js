import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Test3 from './Test3';
import TroubleShootingTips from './TroubleShootingTips';
import CheckCircle from '@material-ui/icons/CheckCircle';



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
                    <h4 align="center"><b>Tool chain manual installation check</b></h4>
                    <Typography align="center">status of the manual installation.</Typography>
                    <div style={{padding:20}}>
                    <Card className={classes.success}>
                            <table align="center" style={{width:'50%'}} >
                                <tr style={{width:'100%'}}>
                                    <td align="right" style={{width:'30%'}}>
                                        <CheckCircle style={{color:'green'}}/>
                                    </td>
                                    <td align="left" style={{width:'50%'}}>
                                    <Typography  id = "Installation-in-prog">
                                    Automated installation successful
                                    </Typography></td>
                                </tr>
                            </table> </Card>
                    </div>
                        <div style={{padding:20,width:'100%'}}>
                        <table align="center" style={{width:'100%',height:"3rem"}}>
                            <tr >
                                <td style={{width:'60%'}}><Test3/></td>
                                <td style={{width:'5%'}}></td>
                                <td style={{width:'35%'}}>
                                    <div style={{border: 'solid green',height:'100%',width: '100%',overflow:'scroll'}}>
                                        <TroubleShootingTips/>

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