import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccSettings from '@material-ui/icons/Settings';
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
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
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
            skipped: new Set(),
        }
    }

    handleCapsuleClick = (title) => {
      //  console.log('capsule selected', title);
        const { pipelineName } = this.state;
        const { selectedPipelineIndex, selectedCapsule } = this.state;
       // console.log(pipelineName);
        let isButtonDisabled = true;
       // console.log('selectedPipelineIndex',selectedPipelineIndex)
        if((selectedPipelineIndex!=null) && (pipelineName!=null) && (selectedCapsule!=null)) {
            isButtonDisabled = false;
        }
        this.setState({
            isButtonDisabled: isButtonDisabled,
            selectedCapsule: title,
        })
    }

   
      handleNameChange = ($event) => {
        let pipelineName = $event.target.value;
        let isButtonDisabled = true;

        const { selectedCapsule, selectedPipelineIndex } = this.state;
        

        console.log('Pipeline name ',pipelineName);
        console.log((pipelineName==''));
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
        console.log(pipelineName);
        console.log(selectedCapsule);
        console.log('try1',sIndex);

        this.setState({isCreateDisabled : false});
        this.setState({
            selectedPipelineIndex: sIndex,
            serviceArray: serviceArray,
        
        });
        const { selectedPipelineIndex } = this.state;
        //console.log('try',selectedPipelineIndex);
        //console.log('called',serviceArray, sIndex);
        if((selectedPipelineIndex!=null) && (pipelineName) && (selectedCapsule!=null)) {
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
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

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
                                     style={{ margin:'1.2rem', width:'11rem', height:'5rem' }}>
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
                



                <div style={{width: '80%', margin: 'auto'}}>
                    <Card className={classes.card}>
                    <CardContent>
                        <div align='center'>
                            <Typography fontSize= '14'>
                                SELECT THE PIPELINE ASSEMBLY
                            </Typography> 
                        </div>
                        <br/>

                         <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                            <Tab label="PIPELINE 1"/>
                            <Tab label="PIPELINE 2" />
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
                        </CardContent>
                        </Card>
                        </div>


<CardActions className="button_cpl1">
                            <Button variant="contained" color='primary' style={{ backgroundColor: '#145da1' }} 
                            onClick={this.handleNext} disabled = {isButtonDisabled}> Next </Button>
                        </CardActions>

           </div>
        );
    }

}

export default withStyles(styles)(Test1);