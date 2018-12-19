import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Test from './Test';
import TroubleShootingTips from './TroubleShootingTips';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';

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
    
  });


class ManualInstallationCheck extends Component{

    constructor()
    {
        super();

        this.state = {
            isStatus: '',
            data: 0,
            refreshData: 0
        }

    }
    componentWillMount()
    {
        //localStorage.setItem('manualToolStatus', null)
    }

    getFalseValue()
    {
        this.setState({isStatus: false});
        console.log("check")
    }
    getTrueValue()
    {
        this.setState({isStatus: true});
    }

    setNextButton = (data) =>
    {
       console.log("dchs")
        if(data===0)
        {
            this.setState({data: data+1});
            console.log("taosandn")
            {this.props.triggerUpdate1()}
            
        }
        else{
            //this.setState({data: data+1})
        }
    }
    setRefreshButton = (refreshData) =>
    {
       console.log("dchs")
        if(refreshData===0)
        {
            this.setState({refreshData: refreshData+1});
            console.log("taosandn")
            {this.props.triggerUpdate2()}
            
        }
        else{
            //this.setState({data: data+1})
        }
    }
    


    render()
    {
        const { classes,selectedPipelineIndex } = this.props;
        var count =0;
        return(
            <div className={classes.root}>
                <Card className={classes.card}>
                    <h4 align="center"><b>Tool chain manual installation check</b></h4>
                    <Typography align="center">status of the manual installation.</Typography>
                    <div style={{padding:20}}>
                    {console.log("manual tool status chekc :==> "+localStorage.getItem("manualToolStatus"))}
                    
                    {this.state.isStatus ?
                    <div>{this.setNextButton(this.state.data)}
                    {this.setRefreshButton(this.state.refreshData)}
                    <Card className={classes.success}>
                            <table align="center" style={{width:'50%'}} >
                                <tr style={{width:'100%'}}>
                                    <td align="right" style={{width:'30%'}}>
                                        <CheckCircle style={{color:'green'}}/>
                                    </td>
                                    <td align="left" style={{width:'50%'}}>
                                    <Typography  id = "Installation-in-prog">
                                    All tools have been Correctly Installed
                                    </Typography></td>
                                </tr>
                            </table>
                    </Card>
                    </div>
                    :
                    [this.state.isStatus === false ?
                    <div>
                    <Card className={classes.failure}>
                                <table align="center" style={{width:'100%'}} >
                                    <tr style={{width:'100%'}}>
                                        <td align="right" style={{width:'20%'}}>
                                            <HighlightOff style={{color:"red"}} />
                                        </td>
                                        <td align="left" style={{width:'80%'}}>
                                        <Typography  id = "Installation-in-prog">
                                        Some tools were not installed correcly.
                                        </Typography></td>
                                    </tr>
                                </table>
                    </Card></div> :
                    <Card className={classes.progress}>
                    <table align="center" style={{width:'40%'}} >
                        <tr style={{width:'100%'}}>
                            <td align="right" style={{width:'50%'}}>
                                <CircularProgress/>
                            </td>
                            <td align="center" style={{width:'50%'}}><Typography  id = "Installation-in-prog">Installation in Progress</Typography></td>
                        </tr>
                    </table>

                    </Card> ]}</div>
                    
                        <div style={{padding:20,width:'100%'}}>
                        <table align="center" style={{width:'100%',height:"3rem"}}>
                            <tr >
                                <td style={{width:'60%'}}>
                                <Test count = {count} selectedPipelineIndex={selectedPipelineIndex} findValue={this.getFalseValue.bind(this)}
                                findTrueValue={this.getTrueValue.bind(this)}/></td>
                                <td style={{width:'5%'}}></td>
                                <td style={{width:'35%'}}>
                                    <div style={{border: 'solid green',width: '322px',height:'353px'}}>
                                        <TroubleShootingTips status={this.state.isStatus}/>

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
export default withStyles(styles)(ManualInstallationCheck);