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
import AutomatedToolChain from './AutomatedToolChain';
import ManualInstallation from './ManualInstallation';




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
    return ['Setup', 'Automated check','Manual','Installation status'];
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
    fetch('api/installPipeline', postobj)
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
      if(!selectedPipelineIndex)
        //return < ref={foo => this.foo = foo}/>;
        return <AutomatedToolChain ref={foo => this.foo = foo}/>;
      case 2:
      if(!selectedPipelineIndex)
        //return <div><Test4 ref={test4Ref => this.test4Ref = test4Ref}/></div>;
        return <ManualInstallation/>;
        case 3:
        return null;
        
      
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
                
                    <div align="center" style={{background: '#f5f5f5'}}>
                        <div style={{width:'50%'}} >            
                        <Stepper activeStep={activeStep} alternativeLabel style={{background: '#f5f5f5'}}>
                                {steps.map(label => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </div>
                    </div >
                    <Card>
                        <div className={classes.card} id="screen1">
                    <h4 align="center"><b>Create a new toolchain</b></h4>
                    <Typography align="center">Setup your project's toolchain</Typography>
               
                
                <div >
                                <Table className={classes.table}>                               
                                    <TableRow>
                                        <TableCell style={{textAlign:'left',width:"50%",border:0}}>Name</TableCell>
                                        <TableCell style={{textAlign:'center',width:"50%", border:0}}>Select Stack Technology</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{textAlign:'left',width:"50%",border:0}}>
                                            <TextField 
                                                required
                                                id="input-name"
                                                placeholder="Enter a name"
                                                value={pipelineName}
                                                onChange={this.handleNameChange}
                                                variant="filled"
                                                fullWidth="true"
                                                
                                            />
                                        </TableCell>
                                        <TableCell style={{textAlign:'center',width:"50%",border:0}}>
                                        <div className="wrapper_cpl1" >
                                        {capsuleArray.map((capsule, index) => {
                                            return (
                                                 <CardActionArea key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'glowing-border':'border'}
                                                 style={{margin:'1rem', width: '6rem', height: '5rem'}} 
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
                                            </div>
                                        
                                        </TableCell>
                                    </TableRow>
                                </Table>                                                   
                       
                    

                    <div style={{width: '100%', margin: 'auto'}}>
                        
                            <div>
                                <Typography fontSize= '14'>
                                    Select one of the available toolchains
                                </Typography> 
                            </div>

                            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" >
                                <Tab label="Standard"/>
                                <Tab label="Premium" disabled/>
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
                                            <div className={classes.typo}>
                                            <Typography variant="body2">
                                                {sIndex === 0 ? 
                                                 <div style={{width:'100%', border:'solid green'}}>
                                                <table style={{width:'100%'}}>
                                                    <tr style={{width:'100%'}}>
                                                        <td style={{width:'1000%'}}>Standard Tool Chain</td>
                                                        <td style={{width:'100%'}}>Typology</td>
                                                        <td style={{width:'30%'}}>Tools</td>
                                                    </tr>
                                                </table></div>   : 'Jenkins + IBM'}
                                            </Typography>
                                           
                                            </div>
                                        <div> <CheckCircle className={selectedPipelineIndex == sIndex ? 'check-visible':'check-hidden'}/>
                                            </div>
                                            
                                        </div>
                                        <div style={{marginTop: '5px',marginBottom: '8px'}}><ServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                        
                                        </div>
                                        
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
                                                {sIndex === 0 ? 'Open Source + IBM..' : 'Jenkins + IBM'}
                                            </Typography></div>
                                       
                                        <CheckCircle className={selectedPipelineIndex == sIndex ? 'check-visible':'check-hidden'}/>
                                         
                                        </div><div style={{width: '96%', margin: 'auto', marginTop: '0px',}}><Divider/></div>
                                        <div style={{marginTop: '5px',marginBottom: '8px'}}><ServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                        
                                        </div>
                                        <br/>
                                    </div>
                                })}
                                
                                
                            </div>
                            
                            </TabContainer>}
                            
                            </div>
                </div>
                </div>
                <div style={{width:"100%", border: "solid green"}}>
                <div style={{width:"100%", border: "solid red"}}>{this.getStepContent(activeStep,selectedPipelineIndex)}</div>
                </div>
                    {activeStep === steps.length ? null : (
            <div style={{margin: "1rem"}}>
              <Button style={{float: "right"}}  disabled = {isButtonDisabled}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext.bind(this)}
                  className={classes.button}
                >
                 {activeStep===0 ? 'Next: Install': [activeStep === steps.length - 1 ? 'DashBoard' : 'Next: manual Install']}
                </Button>
                {activeStep===1 || activeStep===2 ?
                <Button style={{float: "right"}} 
                variant="outlined" color="primary"
                  
                  onClick={this.handleNextClick.bind(this)}
                  className={classes.button}
                >
                  Previous
                </Button> : [activeStep === steps.length - 1 ?
                <Button style={{float: "right"}} 
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              >
                 Refresh 
              </Button> : null]}

                {activeStep=== steps.length-1 ?
                <Button style={{float: "right"}} disabled = {this.state.isPrevDisabled}
                variant="outlined" color="primary"
                  
                  onClick={this.handlePrevious.bind(this)}
                  className={classes.button}
                >
                  Previous
                </Button>
                : [activeStep === steps.length - 1 ?
                    <Button style={{float: "right"}} 
                    variant="outlined"
                    color="primary"
                    onClick={this.handlePrevious1}
                    className={classes.button}
                  >
                     Previous 
                  </Button> : null]}
                <div>

                <div>
                <Button //disabled = {activeStep!=1}
                className = {activeStep>=1 ? 'check-visible':'check-hidden'}
                variant="outlined" color="primary"
                  onClick={this.handleCancel}
                //  className={classes.button}
                >
                  Cancel
                </Button>
                
              
                </div>
              </div>
            </div>
          )}
          </Card>
           </div>
        );
    }

}

export default withStyles(styles)(Test1);