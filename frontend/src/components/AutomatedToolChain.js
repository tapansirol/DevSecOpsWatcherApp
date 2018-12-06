import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Test3 from './Test3';
import '../static/css/CreatePL1.css';



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
      success: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#effae7',
        height: '3.5rem'
      },
      failure: {
        flexGrow: 1,
        padding: 10,
        margin: 'auto',
        background:'#faf0f1',
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
        this.state = {
            value: '',
            time: '',
            flag: 'false',
        }

    }
    componentDidMount() {

        this.interval = setInterval(() => this.setState({ time: localStorage.getItem('installationLog'), flag: true }), 10000);
        
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
                   {/*{ console.log("check statusValue here----->"+localStorage.getItem('statusValue'))}
                   {console.log("VVVVVVVV------>",localStorage.getItem('statusValue')&&true)}*/}
                        {localStorage.getItem('statusValue')=='true' ? 
                        
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
                            </table> </Card>: 
                            <Card className={classes.failure}>
                                <table align="center" style={{width:'100%'}} >
                                    <tr style={{width:'100%'}}>
                                        <td align="right" style={{width:'20%'}}>
                                            <HighlightOff style={{color:"red"}} />
                                        </td>
                                        <td align="left" style={{width:'80%'}}>
                                        <Typography  id = "Installation-in-prog">
                                        Some tools were not installed correcly. Re-run the script or <a href="">contact your Admin</a> for help.
                                        </Typography></td>
                                    </tr>
                                </table>
                        </Card> }                   
                        
                    </div>
                        <div style={{padding:20,width:'100%'}}>
                        <table align="center" style={{width:'100%',height:"3rem"}}>
                            <tr >
                                <td style={{width:'48%'}}>
                                {console.log("flag =--==->", this.state.flag)}
                               
                                {this.state.flag===true ? 
                                <Test3 className={this.state.flag==='true'? 'check-visible':'check-hidden'}/> :null}
                                </td>
                                <td style={{width:'4%'}}></td>
                                <td style={{width:'48%'}}>
                                    <div id="t" style={{border: 'solid green',height:'100%',width: '100%',overflow:'auto'}}>
                                    
                                       {localStorage.getItem("installationLog")}
                                       {/*Loading...
                                       {localStorage.getItem('statusValue')}
                                       {console.log("check statusValue in atc----->"+localStorage.getItem('statusValue'))}*/}

                                    </div>
                                </td>
                            </tr>
                        </table>
                        </div>
                        {this.state.flag}
                </Card>
               
            </div> 
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);