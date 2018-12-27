import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TroubleShootingTips from './TroubleShootingTips';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HighlightOff from '@material-ui/icons/HighlightOff';
import StatusTableManual from './StatusTableManual';

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
    


    //   card: {
    //     minWidth: 275,
        
    //   },
    //   success: {
    //     flexGrow: 1,
    //     //padding: 10,
    //     //margin: 'auto',
    //     //background:'#effae7',
    //     //height: '3.5rem'
    //   },
    //   failure: {
    //     flexGrow: 1,
    //     padding: 10,
    //     margin: 'auto',
    //     background:'#faf0f1',
    //     height: '3.5rem'
    //   },
    
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
                <div  >
                    <Typography id="manualInstallationHeading">Tool chain manual installation check</Typography>
                    <Typography id="manualInstallationSubHeading">status of the manual installation.</Typography>
                    <div>
                    {console.log("manual tool status chekc :==> "+localStorage.getItem("manualToolStatus"))}
                    {this.state.isStatus ?
                        <div>
                            {this.setNextButton(this.state.data)}
                            {this.setRefreshButton(this.state.refreshData)}
                            <Card id="manualSuccess">
                                <CheckCircle id="successButton"/> 
                                <Typography  id = "successText">
                                    All tools have been Correctly Installed
                                </Typography>
                               
                            </Card>
                        </div>
                    :
                        [this.state.isStatus === false ?
                            <div>
                                <Card className={classes.failure} id="manualFailure">
                                    <HighlightOff id="failureButton" />
                                    <Typography  id = "failureText">
                                        Some tools were not installed correcly.
                                    </Typography>
                                </Card>
                            </div> 
                        :
                            <Card className={classes.progress} id = "manualProgress">
                                <CircularProgress id="progressButton"/>
                                <Typography  id = "successText">
                                    Installation in Progress
                                </Typography>
                            </Card> 
                        ]} 
                    </div>
                    
                        <div id="statusTableDiv">
                        
                                <StatusTableManual  count = {count} selectedPipelineIndex={selectedPipelineIndex} findValue={this.getFalseValue.bind(this)}
                                findTrueValue={this.getTrueValue.bind(this)}/>
                                
                                        <div id = "troubleShootingDiv"><TroubleShootingTips status={this.state.isStatus}/></div>

                                        </div>

                </div>
               
            </div>
        );
    }
}
export default withStyles(styles)(ManualInstallationCheck);