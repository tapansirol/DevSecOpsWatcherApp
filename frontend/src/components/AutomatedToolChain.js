import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../static/css/AutomatedToolChain.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Test3 from './Test3';
import '../static/css/CreatePL1.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from "@material-ui/core/Slide";



const styles = theme =>({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 'auto',
      
    },
    // progress: {
    //     flexGrow: 1,
    //     padding: 10,
    //     margin: 'auto',
    //     background:'#e7f3ff',
    //     height: '3.5rem'
    //   },
    //   success: {
    //     flexGrow: 1,
    //     padding: 10,
    //     margin: 'auto',
    //     background:'#effae7',
    //     height: '3.5rem'
    //   },
    //   failure: {
    //     flexGrow: 1,
    //     padding: 10,
    //     margin: 'auto',
    //     background:'#faf0f1',
    //     height: '3.5rem'
    //   },
    


    //   card: {
    //     minWidth: 275,
    //     padding: 20,
    //   },
    
    
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
            data : 0
        }

    }
    setNextButton = (data) =>
    {
       console.log("dchs")
        if(data===0)
        {
            this.setState({data: data+1});
            console.log("taosandn")
            {this.props.triggerUpdate()}
            
        }
        else{
            //this.setState({data: data+1})
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
            <div className={classes.root}>
           
                <Card className={classes.card}>
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
                                <Card className={classes.success} onLoad={this.getValue}>
                                    <CheckCircle id="manualSuccess"/>
                                    <Typography  id = "successText">
                                    Automated installation successful
                                    </Typography>
                                </Card>
                            </div>
                             
                            ]}                   
                        <div id="statusTableDiv">
                               
                            {localStorage.getItem("installationLog")===null ? 
                            null 
                            :
                                <Slide direction="right" in={localStorage.getItem("installationLog").includes("*COMPLETED***")}>
                                    <Test3 selectedPipelineIndex={selectedPipelineIndex}/>
                                </Slide>
                            }
                            <div id="t" style={{width: '100%',overflow:'auto', backgroundColor:'black'}}>
                                <span style={{color:'white'}}>{localStorage.getItem("installationLog")}</span>
                            </div>
                                
                        </div>
                      
                </Card>
               
            </div> 
        );
    }
}
export default withStyles(styles)(AutomatedToolChain);
//export default AutomatedToolChain;