import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import error from '../static/images/extra/error.svg';
import success from '../static/images/extra/success.svg';

// const styles = theme =>({
//     root: {
//       flexGrow: 1,
//       width: '100%',
//       margin: 'auto',
      
//      },   
//   });


class ManualInstallationCheck extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            isStatus: '',
            data: 0,
            refreshData: 0,
            refreshButtonIndex: 0
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
        
    }
    RefreshButton()
    {
        this.refs.stm.callAPI();
       console.log("inside refresh button method...")
       this.setState({refreshButtonIndex: 1});

    }
    


    render()
    {
        //const { classes,selectedPipelineIndex } = this.props;
        //var count =0;
        return(
            <div /*className={classes.root}*/>
                <div  >
                    <Typography id="manualInstallationHeading">Toolchain manual Installation check</Typography>
                    <Typography id="manualInstallationSubHeading">status of the manual installation.</Typography>
                    <div>
                    {console.log("manual tool status chekc :==> "+localStorage.getItem("manualToolStatus"))}
                    {this.state.isStatus ?
                        <div>
                            {this.setNextButton(this.state.data)}
                             {this.setRefreshButton(this.state.refreshData)} 
                            <Card id="manualSuccess">
                                <img src={success} id="successButton" alt="Sorry Image not found"/> 
                                <Typography  id = "successText">
                                    All tools have been correctly installed
                                </Typography>
                               
                            </Card>
                        </div>
                    :
                        [this.state.isStatus === false ?
                            <div>
                                <Card /*className={classes.failure}*/ id="manualFailure">
                                    <img src={error} id="failureButton" alt="Sorry Image not found"/>
                                    <Typography  id = "failureText">
                                        Some tools were not installed correctly.
                                    </Typography>
                                </Card>
                            </div> 
                        :

                        <div>
                        {this.setNextButton(this.state.data)}
                         {this.setRefreshButton(this.state.refreshData)} 
                        <Card id="manualSuccess">
                            <img src={success} id="successButton" alt="Sorry Image not found"/> 
                            <Typography  id = "successText">
                                No manual tools required for this pipeline
                            </Typography>
                           
                        </Card>
                    </div>
                            // <Card /*className={classes.progress}*/ id = "manualProgress">
                            //     <img src={loading} id="progressButton"/>
                            //     <Typography  id = "successText">
                            //         Installation in Progress
                            //     </Typography>
                            // </Card> 
                        ]} 
                    </div>
                    
                        {/* <div id="statusTableDiv">
                        {console.log("After Refresh Call")}
                                <StatusTableManual ref="stm"  count = {count} selectedPipelineIndex={selectedPipelineIndex} findValue={this.getFalseValue.bind(this)}
                                findTrueValue={this.getTrueValue.bind(this)}/>
                                
                                        <div id = "troubleShootingDiv"><TroubleShootingTips status={this.state.isStatus}/></div>

                                        </div> */}

                </div>
               
            </div>
        );
    }
}
//export default withStyles(styles)(ManualInstallationCheck);
export default ManualInstallationCheck;