import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import StatusTable from './StatusTable';
import '../static/css/CreatePL1.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from "@material-ui/core/Slide";



const styles = theme =>({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 'auto',    
    },
    
  });


class AutomatedToolChain extends Component{

    constructor()
    {
        super();
        this.state = {
            value: '',
            time: null,
            flag: 'false',
            nextButtonStatus : false,
            data : 0,
            width:'100%',
        }

    }
    setNextButton = (data) =>
    {
        if(data===0)
        {
            this.setState({data: data+1});
            {this.props.triggerUpdate()}
        }
    }
    componentWillMount()
    {
        localStorage.removeItem("installationLog");
    }
    componentDidMount() {

        this.interval = setInterval(() => this.setState({ time: localStorage.getItem('installationLog'), flag: true }), 1000);
        
      }
      getValue()
      {
            this.setState({
                nextButtonStatus: true
            })
      }
   
    render()
    {
        const { classes,selectedPipelineIndex } = this.props;
        const nextButtonStatus = this.state.nextButtonStatus;
       
        return(
                <div className={classes.card}>
                    <Typography id="automatedInstallationHeading">Tool chain automated installation</Typography>
                    <Typography id="automatedlInstallationSubHeading">
                        The system is running some scripts for the automated installation part of your toolchain.
                    </Typography>
                    {localStorage.getItem('statusValue')===null || localStorage.getItem('statusValue')==='null'? 
                        <Card id="automatedProgress">
                           <CircularProgress id="progressButton"/>
                            <Typography  id = "successText">Installation in Progress</Typography>
                        </Card>
                        :   [localStorage.getItem('statusValue')==='false' ?
                            <Card id="manualFailure">
                                <HighlightOff id="automatedFailureButton" />
                                <Typography id = "automatedFailureText">
                                    Some tools were not installed correcly. Re-run the script or <a href="">contact your Admin</a> for help.
                                </Typography>
                            </Card> : 
                            <div>{this.setNextButton(this.state.data)}
                                <Card className={classes.success} onLoad={this.getValue} id="manualSuccess">
                                    <CheckCircle id="successButton"/>
                                    <Typography  id = "successText">
                                    Automated installation successful
                                    </Typography>
                                </Card>
                            </div>
                             
                            ]}                   
                        <div id="automatedStatusTableDiv">
                               
                            {localStorage.getItem("installationLog")===null ? 
                            null 
                            :
                            localStorage.getItem("installationLog").includes("*COMPLETED***") ?
                                <Slide direction="right" 
                                in={localStorage.getItem("installationLog").includes("*COMPLETED***")}>
                                
                                    <StatusTable selectedPipelineIndex={selectedPipelineIndex}/>
                                </Slide>
                                :null
                            }
                            
                            <div  style={{width: "100%"}} id="logDiv">
                                <span style={{color:'white'}}>{localStorage.getItem("installationLog")}</span>
                            </div>              
                        </div>     
                </div>
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);
