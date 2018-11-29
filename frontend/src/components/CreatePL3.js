import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import '../static/css/CreatePL2.css';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Button, CardActions} from '@material-ui/core';
import ServiceAssembly from './ServiceAssembly';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Jenkins_IMG from '../static/images/services/jenkins.JPG';
import Git_IMG from '../static/images/services/git.JPG';
import Sonar_IMG from '../static/images/services/sonar.JPG';
import Asoc_IMG from '../static/images/services/asoc.JPG';
import Dng_IMG from '../static/images/services/dng.JPG';
import Hft_IMG from '../static/images/services/hft.JPG';
import Rtc_IMG from '../static/images/services/rtc.JPG';
import Ucd_IMG from '../static/images/services/ucd.JPG';
import Ucv_IMG from '../static/images/services/ucv.JPG';
import Test_IMG from '../static/images/services/test.JPG';


const imageMap = {
    JENKINS: Jenkins_IMG,
    GITHUB: Git_IMG,
    SONARQUBE: Sonar_IMG,
    ASOC: Asoc_IMG,
    DNG: Dng_IMG,
    HFT: Hft_IMG,
    RTC: Rtc_IMG,
    UCD: Ucd_IMG,
    UCV: Ucv_IMG,
    RQM: Test_IMG,
    HOTUI: Test_IMG,
    HOTPT: Test_IMG,
}

// const serviceCategoryArray = ['DEVELOPANDTEST','RELEASEANDDEPLOY','PLANANDMEASURE']

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

const styles = {
    card: {
      margin: 50,
      display: 'block',
      height: '36vw',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    typo: {
        width: 1010,
    },
    check: {
        width: 250,
    }
  };

class CreatePL3 extends Component {
    constructor(props) {
        super();
        let pl=localStorage.getItem("pl");
        let serviceArray = localStorage.getItem('serviceArray');
        let selectedPipelineIndex = localStorage.getItem('selectedPipelineIndex');
        console.log(serviceArray+" serviceArray <> selectedPipelineIndex "+selectedPipelineIndex);
        let isCreateDisabled = true;
        let temp='none';
        if(serviceArray && selectedPipelineIndex){
            isCreateDisabled = false;
        }
        this.state= {
        //    pl: pl,
            pipelineArray: [],
            isCreateDisabled: isCreateDisabled,
            serviceArray: serviceArray,
            selectedPipelineIndex: selectedPipelineIndex,
            temp:temp,
            value:0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };

    componentWillMount(){//lifecycle method of component
        const capsule = localStorage.getItem('selectedCapsule');
        fetch('api/services?capsule='+capsule)
            .then(response => response.text())
            .then(message => {
                console.log(JSON.parse(message));
                this.setState({pipelineArray: JSON.parse(message)});
            });
    }

    handlePrevious = () => {
        console.log("Previous called");
        localStorage.setItem('selectedPipelineIndex', this.state.selectedPipelineIndex);
        localStorage.setItem('serviceArray', this.state.serviceArray);
        
        this.props.history.push('/createpl1');
        
    }

    handleCreate = () => {//TODO writr service for this
        let selectedCapsule = localStorage.getItem("selectedCapsule");
        let pipelineName = localStorage.getItem("pipelineName");
        let data = {
            "pipeleineId": '',
            "pipeleineName": pipelineName,
            "capsule": selectedCapsule,
            "services": this.state.serviceArray,
        }
        let postobj = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
        fetch('api/pipeline', postobj)
            .then(response => response.text())
            .then(message => {
                console.log(JSON.parse(message));
                this.props.history.push({
                    pathname: '/monitor',
               //pathname: '/manual',
                 //   pipelineArray: JSON.parse(message) 
                });
                localStorage.removeItem("selectedCapsule");
                localStorage.removeItem("pipelineName");
                localStorage.removeItem("serviceArray");
                localStorage.removeItem("selectedPipelineIndex");
            }).catch(error => console.error('Error:', error));
            
    }

    handleSelectPipeline = (serviceArray, sIndex) => {
        if(sIndex==0)
        localStorage.setItem("pl","pl1");
        if(sIndex==1)
        localStorage.setItem("pl","pl2");
        this.setState({isCreateDisabled : false});
        this.setState({
            selectedPipelineIndex: sIndex,
            serviceArray: serviceArray,
        
        })
        console.log('called',serviceArray, sIndex);
    }

    // compare = (a, b) =>{
    //     if (a.serviceCategory < b.serviceCategory)
    //       return -1;
    //     if (a.serviceCategory > b.serviceCategory)
    //       return 1;
    //     return 0;
    // }
      
    render() {
        const { classes } = this.props;
        const { pipelineArray, selectedPipelineIndex, isCreateDisabled, temp ,value} = this.state;
        // console.log('render '+pipelineArray[0].sort(this.compare));
        return(
            <div style={{width: '80%', margin: 'auto'}}>
                <Card className={classes.card}>
                    <CardContent>
                       <Typography className={classes.title}>
                            Create a new pipeline 2/2
                        </Typography>
                        <Divider />
                        <br/>
                        <div align='center'>
                            <Typography fontSize= '14'>
                                SELECT THE PIPELINE ASSEMBLY
                            </Typography> 
                        </div>
                        <br/>

                         <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
        <Tab label="PIPELINE 1"/>
        <Tab label="PIPELINE 2" />
        </Tabs>
        {value == 0 && (
          <TabContainer>
             <div style={{textAlign: 'center'}}>
                            {pipelineArray.map((serviceArray, sIndex) => {
                                if(sIndex==0)
                                return <div key={sIndex}>
                                    <div className={selectedPipelineIndex == sIndex ? 'glowing-border-cpl2':'border-cpl2'}
                                    onClick={()=>{this.handleSelectPipeline(serviceArray, sIndex)}}>
                                    <div align="left" style={{width: '96%', margin: 'auto', marginTop: '7px',display: 'flex'}}>
                                        <div className={classes.typo}><Typography variant="body2">
                                            {sIndex === 0 ? 'Open Source + IBM' : 'Jenkins + IBM'}
                                        </Typography></div>
                                       <div> <CheckCircle className={selectedPipelineIndex == sIndex ? 'check-visible':'check-hidden'}/>
                                        </div>
                                        
                                    </div><div style={{width: '96%', margin: 'auto', marginTop: '0px',}}><Divider/></div>
                                    <div style={{marginTop: '5px',marginBottom: '8px'}}><ServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                    
                                    </div>
                                    <br/>
                                </div>
                            })}
                            
                            
                        </div>
          </TabContainer>
        )}
        {value === 1 && <TabContainer>
            <div style={{textAlign: 'center'}}>
                            {pipelineArray.map((serviceArray, sIndex) => {
                                if(sIndex==1)
                                return <div key={sIndex}>
                                    <div className={selectedPipelineIndex == sIndex ? 'glowing-border-cpl2':'border-cpl2'}
                                    onClick={()=>{this.handleSelectPipeline(serviceArray, sIndex)}}>
                                    <div align="left" style={{width: '96%', margin: 'auto', marginTop: '7px',display: 'flex'}}>
                                        <div className={classes.typo}><Typography variant="body2">
                                            {sIndex === 0 ? 'Open Source + IBM' : 'Jenkins + IBM'}
                                        </Typography></div>
                                       <div> <CheckCircle className={selectedPipelineIndex == sIndex ? 'check-visible':'check-hidden'}/>
                                        </div>
                                        
                                    </div><div style={{width: '96%', margin: 'auto', marginTop: '0px',}}><Divider/></div>
                                    <div style={{marginTop: '5px',marginBottom: '8px'}}><ServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                    
                                    </div>
                                    <br/>
                                </div>
                            })}
                            
                            
                        </div>
        </TabContainer>}

                       

                    
                        <div>
                            <CardActions className="button-cpl2">
                                <Button variant="contained" style={{ backgroundColor: 'white', color: '#145da1', 
                                        boxShadow: '0 0 10px #145da1', }}
                                onClick={this.handlePrevious}> Previous </Button>
                                <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1', }} 
                                onClick={this.handleCreate} disabled = {isCreateDisabled} > Create </Button>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card> 
            </div>
        );
    }
}

export default withStyles(styles) (withRouter(CreatePL3));