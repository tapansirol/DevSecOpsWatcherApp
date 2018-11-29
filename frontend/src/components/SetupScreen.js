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
import SideBar3 from './SideBar3';
import '../static/css/SideBar.css';
import Test3 from './Test3';
import Test4 from './Test4';
import '../static/css/CreatePL1.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




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
      width: '80%',
      margin: 'auto'
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
      
      media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
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


class Test1 extends Component {

    constructor(props) {
        super();
        console.log('propertiesp',props)
        
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
            isPrevDisabled:true,
            isNextDisabled:false,
            isStandardDashBoardDisabled:true,
            isPremiumDashBoardDisabled:true
            
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
        localStorage.setItem("pipelineName", pipelineName)
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
        localStorage.removeItem("pipelineName");
   localStorage.removeItem("selectedCapsule");
   localStorage.removeItem("selectedPipeline")
        APIService.get('api/capsules', null, (result) => { this.setStateFn('capsuleArray', result)});
        //For Pipeline
        //const capsule = localStorage.getItem('selectedCapsule');
        fetch('api/services?capsule=JAVA')
            .then(response => response.text())
            .then(message => {
                console.log(JSON.parse(message));
                this.setState({pipelineArray: JSON.parse(message)});
            });


            fetch('/api/status')
            .then(response => response.json())
                    .then(message => {
                       
                        console.log('Message :', message)
                        
                    });

                    fetch('/api/statusPremiumToolChain')
                    .then(response => response.json())
                            .then(message => {
                              
                                console.log('Message :', message)
                                
                            });

          

            fetch('/api/statusValueStandard')
            .then(response => response.json())
                    .then(message => {
                        this.setState({isStandardDashBoardDisabled: message})

                        console.log('Message :', message)
                        
                    });
            fetch('/api/statusValuePremium')
            .then(response => response.json())
                    .then(message => {
                        this.setState({isPremiumDashBoardDisabled: message})

                        console.log('Message p:', message)
                        
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
        console.log('selectedPipelineIndex', selectedPipelineIndex)
        console.log('sIndex',sIndex)
        //console.log('try',selectedPipelineIndex);
        //console.log('called',serviceArray, sIndex);
        if((sIndex!=null) && (pipelineName!='') && (selectedCapsule!=null)) {
           isButtonDisabled = false;
        }
        
        this.setState({
            isButtonDisabled: isButtonDisabled,
            //selectedCapsule: title,
        })
    }

  handleNext = () => {

    const { activeStep } = this.state;

  
    this.setState({
      activeStep: activeStep + 1,
    });
    if(activeStep>=0)
    {
        document.getElementById("screen1").style.display ="none";
       
    }

    
      localStorage.setItem("selectedCapsule",this.state.selectedCapsule)

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

if(activeStep===0)
{
    fetch('api/pipeline', postobj)
        .then(response => response.text())
        .then(message => {
            console.log(JSON.parse(message));
             this.props.history.push({
            // pathname: '/monitor',
        //    pathname: '/manual',
                 pipelineArray: JSON.parse(message) 
             });
        //    localStorage.removeItem("selectedCapsule");
        //    localStorage.removeItem("pipelineName");
        //    localStorage.removeItem("serviceArray");
        //    localStorage.removeItem("selectedPipelineIndex");
        }).catch(error => console.error('Error:', error));

}
        
    


if(activeStep>1)
{
        
                 this.props.history.push({
                 pathname: '/monitor',
            //    pathname: '/manual',
                    // pipelineArray: JSON.parse(message) 
                 });
            
    
        }
    };   
   
  handlePrevious() {
        if(this.foo.state.activeStep===2)
        {
            this.setState ({
                isPrevDisabled: true,
                isNextDisabled: false
            });
            this.foo.getPreviousStepDetails();
        }
        else if(this.foo.state.activeStep>=1)
        {
            this.setState ({
                isPrevDisabled: false,
                isNextDisabled: false
            });
           
            this.foo.getPreviousStepDetails();
        }
        
  };
  handlePrevious1 = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      isButtonDisabled:false,
      isPrevDisabled: true
    }));
};
  handleNextClick() {
    if(this.foo.state.activeStep===this.foo.state.steps.length-1)
    {
        this.setState({
            isNextDisabled: true
        });
        this.foo.getNextStepDetails();
    }
    else if(this.foo.state.activeStep>=1)
    {
        this.setState({
            isPrevDisabled: false
        });
        this.foo.getNextStepDetails();
  }
   
}

  handleCancel = () => {
    this.setState(state => ({
      activeStep: 0,
    }));

    const { activeStep } = this.state;
    if(activeStep>=1)
    {
        document.getElementById("screen1").style.display ="block";
    }
  };


  getStepContent(step,selectedPipelineIndex) {
    switch (step) {
      case 0:
        return <div></div>
      case 1:
      console.log('pipeline name :',selectedPipelineIndex);
      if(selectedPipelineIndex)
        return <SideBar ref={foo => this.foo = foo}/>;
        return <SideBar3 ref={foo => this.foo = foo}/>;
      case 2:
      if(selectedPipelineIndex)
        return <div><Test4 ref={test4Ref => this.test4Ref = test4Ref}/></div>;
        return <div><Test3/></div>;
        case 3:
        return null
        
      
    }
  }

    render() 
    {
        const { activeStep } = this.state;
        const { classes } = this.props;
        const steps = getSteps();
        const { capsuleArray, isButtonDisabled, pipelineName, pipelineArray, 
            selectedPipelineIndex, temp ,value, isStandardDashBoardDisabled,isPremiumDashBoardDisabled} = this.state;
       // console.log('yahan active step ka value :')
       console.log("value kya hai ?",isPremiumDashBoardDisabled)
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
               
                
                <div id="screen1">
                   
                        
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{textAlign:'left', width:"50%"}}>Name</TableCell>
                                        <TableCell style={{textAlign:'center'}}>Select Stack Technology</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{textAlign:'left',width:"50%",}}>
                                            <TextField 
                                                required
                                                id="input-name"
                                                label="Enter a name"
                                                value={pipelineName}
                                                onChange={this.handleNameChange}
                                                variant="outlined"
                                                style = {{width: "80%"}} 
                                            />
                                        </TableCell>
                                        <TableCell style={{width:"80%", display: 'flex'}}>
                                            {capsuleArray.map((capsule, index) => {
                                            return (
                                            
                                                   
                                                        <CardActionArea key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'glowing-border':'border'}
                                                    
                                                        
                                                        style={{margin:'1rem',width:'10rem', height:'4rem', display: 'flex'}} 
                                                            onClick= {() => {this.handleCapsuleClick(capsule)}}>
                                                            <CardMedia
                                                                component='img'
                                                                className={classes.media}
                                                                image={imageMap[capsule]}
                                                                title={capsule}
                                                            />
                                                            <CheckCircle className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/>
                                                        </CardActionArea>
                                                    
                                                    );
                                            })}
                                        </TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                                </Table>                                                   
                       
                    

                    <div style={{width: '100%', margin: 'auto'}}>
                        <Card className={classes.card}>
                        <CardContent>
                            <div align='center'>
                                <Typography fontSize= '14'>
                                    SELECT THE PIPELINE ASSEMBLY
                                </Typography> 
                            </div>

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
                </Card>
                <Typography className={classes.instructions}>{this.getStepContent(activeStep,selectedPipelineIndex)}</Typography>

                    {activeStep === steps.length ? null : (
            <div>
                 
              
                <Button style={{float: "right"}} disabled = {activeStep<=1 ? isButtonDisabled  
                    : !isPremiumDashBoardDisabled }
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext.bind(this)}
                  className={classes.button}
                >
                 {activeStep===0 ? 'Next': [activeStep === steps.length - 1 ? 'DashBoard' : 'Check & Deploy']}
                </Button>
                {activeStep===1 ?
                <Button style={{float: "right"}} disabled = {this.state.isNextDisabled}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNextClick.bind(this)}
                  className={classes.button}
                >
                  Next
                </Button> : [activeStep === steps.length - 1 ?
                <Button style={{float: "right"}} 
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              >
                 Recheck & Deploy 
              </Button> : null]}

                {activeStep===1 ?
                <Button style={{float: "right"}} disabled = {this.state.isPrevDisabled}
                  variant="contained"
                  color="primary"
                  onClick={this.handlePrevious.bind(this)}
                  className={classes.button}
                >
                  Previous
                </Button>
                : [activeStep === steps.length - 1 ?
                    <Button style={{float: "right"}} 
                    variant="contained"
                    color="primary"
                    onClick={this.handlePrevious1}
                    className={classes.button}
                  >
                     Previous 
                  </Button> : null]}
                <div>

                <div>
                <Button style={{marginLeft:"300px"}} //disabled = {activeStep!=1}
                className = {activeStep>=1 ? 'check-visible':'check-hidden'}
                  variant="contained"
                  color="primary"
                  onClick={this.handleCancel}
                //  className={classes.button}
                >
                  Cancel
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