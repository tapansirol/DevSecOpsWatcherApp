import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import '../static/css/Screen1.css';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Java_IMG from '../static/images/capsules/new/java.JPG';
import Dotnet_IMG from '../static/images/capsules/new/dotnet.JPG';
import Sap_IMG from '../static/images/capsules/new/sap.JPG';
import Cpp_IMG from '../static/images/capsules/new/c++.JPG';
import Embedded_IMG from '../static/images/capsules/new/embedded.JPG';
import APIService from '../util/APIService';
import { Button} from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from '@material-ui/core/Divider';
import ServiceAssembly from './ServiceAssembly';
import '../static/css/CreatePL2.css';
import SideBar from './SideBar';
import '../static/css/SideBar.css';
import Test3 from './Test3';
import '../static/css/CreatePL1.css'



const imageMap = {
    JAVA: Java_IMG,
    DOTNET: Dotnet_IMG,
    SAP: Sap_IMG,
    CPP: Cpp_IMG,
    EMBEDDED: Embedded_IMG,
}


//import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({
    root: {
      flexGrow: 1,
     // width: '30%',
    },
    grow: {
      flexGrow: 1,
    },
    backButton: {
        marginRight: theme.spacing.unit,
      },
      instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
      },


      card: {
        minWidth: 275,
        padding: 20,
        //align: 
        //marginLeft: 30
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      


      title: {
        fontSize: 14,
        
      },
      pos: {
        marginBottom: 12,
      },
     
    
  });


  //Changes by Debasis
  
  function getSteps() {
    return ['Creation', 'Setup', 'Status'];
  }

  //For pipeline
  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <div><SideBar/></div>;
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }

  //const { classes } = props;

class Test1 extends Component {

    constructor(props) {
        super();
        this.setStateFn = this.setStateFn.bind(this);// to bind setStateFn as this is being passed to APIService
        let selectedCapsule = localStorage.getItem("selectedCapsule");
        let pipelineName = localStorage.getItem("pipelineName");
        let isButtonDisabled = true;
        if(pipelineName && selectedCapsule && selectedPipelineIndex) {
            isButtonDisabled = false;
        }

        //For Pipeline
        let pl=localStorage.getItem("pl");
        let serviceArray = localStorage.getItem('serviceArray');
        let selectedPipelineIndex = localStorage.getItem('selectedPipelineIndex');
       // console.log(serviceArray+" serviceArray <> selectedPipelineIndex "+selectedPipelineIndex);
        let isCreateDisabled = true;
        let temp='none';
        if(serviceArray && selectedPipelineIndex){
            isCreateDisabled = false;
        }
        this.state= {
            capsuleArray: [],
            isButtonDisabled: isButtonDisabled,
            pipelineName: pipelineName || '',
            selectedCapsule: selectedCapsule,

            //For Pipeline
            pipelineArray: [],
            isCreateDisabled: isCreateDisabled,
            serviceArray: serviceArray,
            selectedPipelineIndex: selectedPipelineIndex,
            temp:temp,
            value:0,

            //Foe Stepper
            activeStep: 0,
            
        }
    }

    handleCapsuleClick = (title) => {
        console.log('capsule selected', title);
        const { pipelineName, selectedPipelineIndex } = this.state;
        //const {  } = this.state;
        
        let isButtonDisabled = true;
       // console.log('selectedPipelineIndex',selectedPipelineIndex)
        if((selectedPipelineIndex!=null) && (pipelineName!='')) {
            isButtonDisabled = false;
        }
        this.setState({
            isButtonDisabled: isButtonDisabled,
            selectedCapsule: title,
        })
        //console.log('selectedCapsule ',this.state.selectedCapsule)
    }

   
      handleNameChange = ($event) => {
        let pipelineName = $event.target.value;
        let isButtonDisabled = true;

        const { selectedCapsule, selectedPipelineIndex } = this.state;
        if((selectedPipelineIndex!=null) && (pipelineName!='') && (selectedCapsule!=null)) {
            
            isButtonDisabled = false;
        }
        this.setState({
            pipelineName:pipelineName,
            isButtonDisabled: isButtonDisabled,
        })
    }
    componentWillMount(){
        APIService.get('api/capsules', null, (result) => { this.setStateFn('capsuleArray', result)});
        //For Pipeline
        //const capsule = localStorage.getItem('selectedCapsule');
        fetch('api/services?capsule=JAVA')
            .then(response => response.text())
            .then(message => {
                console.log(JSON.parse(message));
                this.setState({pipelineArray: JSON.parse(message)});
            });
    }
    setStateFn = (key, result) => {//callback fn to be passed to APIService
        let obj = {}
        obj[key] = result
        this.setState(obj)
     }

    //For Pipeline
    handleChange = (event, value) => {
        this.setState({ value });
    };


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
               //     pathname: '/monitor',
               pathname: '/manual',
                    pipelineArray: JSON.parse(message) 
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
        const { pipelineName } = this.state;
        const { selectedCapsule } = this.state;
        let isButtonDisabled = true;
        

        //this.setState({isCreateDisabled : false});
        this.setState({
            selectedPipelineIndex: sIndex,
            serviceArray: serviceArray,
        
        });
        const { selectedPipelineIndex } = this.state;
        //console.log('try',selectedPipelineIndex);
        //console.log('called',serviceArray, sIndex);
        if((selectedPipelineIndex!=null) && (pipelineName!='') && (selectedCapsule!=null)) {
           isButtonDisabled = false;
        }
        
        this.setState({
            isButtonDisabled: isButtonDisabled,
            //selectedCapsule: title,
        })
    }
 
  //For Stepper
  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    
   
    this.setState({
      activeStep: activeStep + 1,
    });
    //this.props.history.push('/sidebar');
    document.getElementById("screen1").style.display ="none";
    document.getElementById("screen2").style.display ="block";


    console.log('active step', activeStep);
    if(activeStep===1)
    {
        document.getElementById("screen1").style.display ="none";
        document.getElementById("screen2").style.display ="none";
        document.getElementById("screen3").style.display ="block";
    }
    
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };


  

    render() 
    {
        const { activeStep } = this.state;
        const { classes } = this.props;
        const steps = getSteps();
        const { capsuleArray, isButtonDisabled, pipelineName, pipelineArray, selectedPipelineIndex, isCreateDisabled, temp ,value} = this.state;
        return(
            <div className={classes.root}>
                <Card className={classes.card}>
                    <div align="center">
                        <div style={{width:'40%'}} >            
                        <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map(label => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </div>
                    </div>
                </Card>
                
                <div id="screen1">

                    <Card>
                        <CardContent align="center">
                            <Typography className={classes.title} component="h4" color="textSecondary" gutterBottom class="screen1_typo1">
                                Create a new project
                            </Typography>
                            <Typography color="textSecondary" gutterBottom class="screen1_typo1">
                                Create a new toolchain to start and select your tools and services.
                            </Typography>
                            
                            <div align='center'>
                                <Typography fontSize= '14'>
                                    NAME
                                </Typography>
                                <TextField 
                                    required
                                    id="input-name"
                                    label="Enter a name"
                                    value={pipelineName}
                                    onChange={this.handleNameChange}
                                    variant="outlined"
                                    style = {{width: 500}} 
                                />
                            </div>
                            <br/><br/>
                            <div align='center'>
                                <Typography fontSize= '14'>
                                    SELECT THE TECHNOLOGY STACK
                                </Typography> 
                            </div>

                            <div className="wrapper_cpl1">
                                {capsuleArray.map((capsule, index) => {
                                // console.log('check ',capsule);
                                // console.log('check ',index);
                                    return (
                                    
                                        <Card key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'glowing-border':'border'}
                                        style={{ margin:'1.2rem', width:'10rem', height:'5rem' }}>
                                            <CardActionArea style={{width:'11rem', height:'5rem', display: 'flex'}} 
                                                onClick= {() => {this.handleCapsuleClick(capsule)}}>
                                                <CardMedia
                                                    component='img'
                                                    className={classes.media}
                                                    image={imageMap[capsule]}
                                                    title={capsule}
                                                />
                                                
                                                <CheckCircle className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/>
                                            </CardActionArea>
                                        </Card>
                                    );
                                })}
                            </div>
                            
                            <br/>
                            
                            
                        </CardContent>
                    </Card>
                    



                    <div style={{width: '100%', margin: 'auto'}}>
                        <Card className={classes.card}>
                        <CardContent>
                            <div align='center'>
                                <Typography fontSize= '14'>
                                    SELECT THE PIPELINE ASSEMBLY
                                </Typography> 
                            </div>
                            <br/>

                            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Standard"/>
                                <Tab label="Premium" />
                            </Tabs>
                            {value == 0 && (
                            <TabContainer>
                                <div style={{textAlign: 'center'}}>
                                {pipelineArray.map((serviceArray, sIndex) => {
                                    //console.log('here',serviceArray,sIndex,selectedPipelineIndex );
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
                                        <div> 
                                        <CheckCircle className={selectedPipelineIndex == sIndex ? 'check-visible':'check-hidden'}/>
                                            </div>
                                            
                                        </div><div style={{width: '96%', margin: 'auto', marginTop: '0px',}}><Divider/></div>
                                        <div style={{marginTop: '5px',marginBottom: '8px'}}><ServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                        
                                        </div>
                                        <br/>
                                    </div>
                                })}
                                
                                
                            </div>
                            </TabContainer>}
                            </CardContent>
                            </Card>
                            </div>
                </div>

                <div id="screen2" style= {{display: 'none'}}>
                        <SideBar/>
                </div>

                <div id="screen3" style= {{display: 'none'}}>
                    <Test3/>
                </div>

                    {
                        /*
                    
                        <CardActions className="button_cpl1">
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} 
                            onClick={this.handleNext} disabled = {isButtonDisabled}> {activeStep === steps.length - 1 ? 'Finish' : 'Next'} </Button>
                        </CardActions>
                    */}

                    {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}></Typography>
              <div>
                <Button  style={{float: "right"}}
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button  style={{float: "right"}}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Check & Deploy
                  </Button>
                )}
                <div>
                <Button style={{float: "right"}} disabled = {isButtonDisabled}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
                </div>
              </div>
            </div>
          )}
           </div>
        );
    }

}

export default withStyles(styles)(Test1);