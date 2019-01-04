import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import CardActionArea from '@material-ui/core/CardActionArea';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Java_IMG from '../static/images/capsules/new/java.JPG';
import Dotnet_IMG from '../static/images/capsules/new/dotnet.JPG';
import Sap_IMG from '../static/images/capsules/new/sap.JPG';
import Cpp_IMG from '../static/images/capsules/new/c++.JPG';
import Embedded_IMG from '../static/images/capsules/new/embedded.JPG';
import APIService from '../util/APIService';
import { Button, TableBody} from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StandardServiceAssembly from './StandardServiceAssembly';
import PremiumServiceAssembly from './PremiumServiceAssembly';
import '../static/css/Start.css';
import AutomatedToolChain from './AutomatedToolChain';
import ManualInstallation from './ManualInstallation';
import ManualInstallationCheck from './ManualInstallationCheck';
import ManualInstallationPremium from './ManualInstallationPremium';
import { grey, red } from '@material-ui/core/colors';




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
    //    width: '100%',
      marginLeft:'10%',
      marginRight:'10%',
    //   margin: 'auto'
    },
    marginRight20: {
        marginRight: 20
    },
    // grow: {
    //   flexGrow: 1,
    // },
    // backButton: {
    //     marginRight: theme.spacing.unit,
    //   },
    //   instructions: {
    //     marginTop: theme.spacing.unit,
    //     marginBottom: theme.spacing.unit,
    //   },


    //   card: {
    //     minWidth: 275,
    //     padding: 20,
    //     //align: 
    //     //marginLeft: 30
    //   },
    //   bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    //   },
      
    //   media: {
    //     // ⚠️ object-fit is not supported by IE11.
    //     objectFit: 'cover',
    // },

    //   title: {
    //     fontSize: 14,
        
    //   },
    //   pos: {
    //     marginBottom: 12,
    //   },
     
    // bootstrapRoot: {
    //     'label + &': {
    //       marginTop: theme.spacing.unit * 3,
    //     },
    //   },
      bootstrapInput: {
        borderRadius: 4,
        backgroundColor: '#f5f5f5',
        width:520,
        height:30,
        fontSize: 18,
        //textColor: red
      },
     
    
  });


  //Changes by Debasis
  
  function getSteps() { 
    return ['Setup', 'Automated check','Manual','Installation status'];
  }

  //For pipeline
  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 0 }}>
        {props.children}
      </Typography>
    );
  }


class SetupPage extends Component {

    constructor(props) {
        super();
        //console.log('propertiesp',props)
        
        this.setStateFn = this.setStateFn.bind(this);// to bind setStateFn as this is being passed to APIService
        let selectedCapsule = localStorage.getItem("selectedCapsule");
        let pipelineName = localStorage.getItem("pipelineName");
       // let selectedPipelineIndex = localStorage.getItem('selectedPipelineIndex');
        let isButtonDisabled = true;
        if(pipelineName && selectedCapsule && selectedPipelineIndex) {
            isButtonDisabled = false;
        }

        //For Pipeline
        //let pl=localStorage.getItem("pl");
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
            //isStandardDashBoardDisabled:true,
            isDashBoardDisabled:true,
            installationLog:'',
            isFetching: true,
            isManualButtonDisabled: true,
            isd: true,
            isRefreshDisabled: false
            
        }
    }

  

    handleCapsuleClick = (title) => {
        //console.log('capsule selected', title);
        const { pipelineName, selectedPipelineIndex } = this.state;
        //const {  } = this.state;
        
        let isButtonDisabled = true;
       // console.log('selectedPipelineIndex',selectedPipelineIndex)
        if((selectedPipelineIndex!==null) && (pipelineName!=='')) {
            isButtonDisabled = false;
        }
        this.setState({
            isButtonDisabled: isButtonDisabled,
            selectedCapsule: title,
        })

        this.getAvailablePipeline(title)

        

        //console.log('selectedCapsule ',this.state.selectedCapsule)
    }
    refreshpage()
    {
        this.refs.MIC.RefreshButton();
    }

   
      handleNameChange = ($event) => {
         
        let pipelineName = $event.target.value;
        localStorage.setItem("pipelineName", pipelineName)
        let isButtonDisabled = true;

        const { selectedCapsule, selectedPipelineIndex } = this.state;
        if((selectedPipelineIndex!==null) && (pipelineName!=='') && (selectedCapsule!==null)) {
            
            isButtonDisabled = false;
        }
        this.setState({
            pipelineName:pipelineName,
            isButtonDisabled: isButtonDisabled,
        })
    }

    getAvailablePipeline(selectedCapsule)
    {
        if(selectedCapsule===null)
        {
            fetch('api/services?capsule=')
            .then(response => response.text())
            .then(message => {
                //console.log("Dekho yarr :", JSON.parse(message));
                localStorage.setItem("pa", JSON.parse(message))
                this.setState({pipelineArray: JSON.parse(message)});
            });

        }
        else{
            fetch('api/services?capsule='+selectedCapsule)
            .then(response => response.text())
            .then(message => {
                //console.log("Dekho yarr :", JSON.parse(message));
                localStorage.setItem("pa", JSON.parse(message))
                this.setState({pipelineArray: JSON.parse(message)});
            });

        }
        
    }
    componentWillMount(){
        localStorage.removeItem("pipelineName");
   localStorage.removeItem("selectedCapsule");
   localStorage.removeItem("selectedPipeline");
   localStorage.removeItem("statusValue");
   localStorage.removeItem("installationLog");
   localStorage.removeItem("pl");
        APIService.get('api/capsules', null, (result) => { this.setStateFn('capsuleArray', result)});
        //For Pipeline
        //const capsule = localStorage.getItem('selectedCapsule');
        this.selectedCapsule = null;
        this.getAvailablePipeline(this.selectedCapsule);

            
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
        if(sIndex===0)
        localStorage.setItem("pl","pl1");
        if(sIndex===1)
        localStorage.setItem("pl","pl2");
        const { pipelineName } = this.state;
        const { selectedCapsule } = this.state;
        let isButtonDisabled = true;
       
        this.setState({
            selectedPipelineIndex: sIndex,
            serviceArray: serviceArray,
        
        });
        const { selectedPipelineIndex } = this.state;
        //console.log('selectedPipelineIndex', selectedPipelineIndex)
        console.log('sIndex',sIndex)
        console.log('pipelineName',pipelineName)
        console.log('selectedCapsule',selectedCapsule)
        //console.log('try',selectedPipelineIndex);
        //console.log('called',serviceArray, sIndex);
        if((sIndex!==null) && (pipelineName!=='') && (selectedCapsule!==null)) {
           isButtonDisabled = false;
        }
        
        this.setState({
            isButtonDisabled: isButtonDisabled,
            //selectedCapsule: title,
        })
    }

    installPipeline(postobj)
    {
        localStorage.removeItem('installationLog');

        this.setState({...this.state, isFetching: true})

        const json =  fetch('api/installPipeline', postobj);
      /*  try{
            
            localStorage.removeItem('installationLog')
            const request = async () => {
            const json = await fetch('api/installPipeline', postobj)
            .then(response => response.text());
            console.log("Installation Log ----------------------> ", json);
            localStorage.setItem('installationLog', json)
            }
            request();
            } catch (e) {
            console.log("Installation catch ----------> ",e)
            }*/
    }

    getNextStep()
    {
        const { activeStep } = this.state;

        console.log("Coming till here..."+activeStep)
    this.setState({
      activeStep: activeStep + 1,
    });
    }

  handleNext = () => {



    const { activeStep } = this.state;
    if(activeStep>=0)
    {
        document.getElementById("screen1").style.display ="none";
    } 
    if(activeStep===0)
    {
        localStorage.setItem("selectedCapsule",this.state.selectedCapsule);
        localStorage.removeItem("installationLog");
        let selectedCapsule = localStorage.getItem("selectedCapsule");
        let pipelineName = localStorage.getItem("pipelineName");
        console.log("selected capsule :"+selectedCapsule);
        console.log("Pipeline Name :"+pipelineName);
        console.log("Service Array :"+this.state.serviceArray)
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

        this.installPipeline(postobj);
        this.getNextStep();
        this.getInstallationLog();
        if(this.state.isFetching===true)
        {
            this.timer = setInterval(() => this.getInstallationLog(postobj), 5000);
        }
        

        /*try{
            localStorage.removeItem('installationLog')
            const request = async () => {
            const json = await fetch('api/installPipeline', postobj)
            .then(response => response.text());
            console.log("Installation Log ----------------------> ", json);
            localStorage.setItem('installationLog', json)
            }
            request();
            } catch (e) {
            console.log("Installation catch ----------> ",e)
            }*/

    }

    

    if(activeStep>0 && activeStep<3)
    {
        this.getNextStep();
    }   
    if(activeStep>2)
    {
        
        //let pipelineArray1 = this.state.pipelineArray;
        //console.log("plArray =====>>>>",pipelineArray1)
        this.props.history.push({
        pathname: '/monitor',
        //    pathname: '/manual',
        // pipelineArray: pipelineArray1
        // pipelineArray: this.state.pipelineArray
        }); 
    
    }
};

getInstallationLog()
{
    // console.log("active Step ===========> :"+this.state.activeStep)
    // console.log("installationLog :"+localStorage.getItem("installationLog"))
    
    // if (localStorage.getItem("installationLog")!==null && !localStorage.getItem("installationLog").includes('***COMPLETED***')) {
    fetch('/api/installationLog')
            .then(response => response.text())
            .then(message => {
                //console.log("Dekho yahan ===>", message);
                localStorage.setItem("installationLog", message)
               // this.setState({isFetching:false})
                //this.setState({pipelineArray: JSON.parse(message)});
            });

        // } 
            
}
   
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


handlePreviousSetup = () => {
    this.setState(state => ({
        activeStep: state.activeStep - 1,

    }));
    document.getElementById("screen1").style.display ="block";
}
handlePreviousAutomated = () => {
    this.setState(state => ({
        activeStep: state.activeStep - 1,

    }));
}

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
            console.log('pipeline name ======> :',selectedPipelineIndex);
           // if(selectedPipelineIndex)
                //return < ref={foo => this.foo = foo}/>;
                 return <AutomatedToolChain selectedPipelineIndex={selectedPipelineIndex} triggerUpdate={this.onChangeLink.bind(this)} ref={foo => this.foo = foo}/>; 
                break;
        case 2:
            if(!selectedPipelineIndex)
                //return <div><Test4 ref={test4Ref => this.test4Ref = test4Ref}/></div>;
                return <ManualInstallation />;

            else
                return <ManualInstallationPremium />;
                
            break;
        case 3:
            return <ManualInstallationCheck selectedPipelineIndex={selectedPipelineIndex} triggerUpdate1={this.onManualCheck.bind(this)}
            triggerUpdate2 = {this.onManualCheck2.bind(this)} ref="MIC"/>;
        default:
            return 'Unknown step';
    }
  }


  componentWillUnmount() {
      this.timer = null;
    }

  
    onChangeLink()
    {
        this.setState({isd: false})
        console.log("hahah :==>")
        console.log("Is Disabled ?"+this.state.isd)
    }

    onManualCheck()
    {
        this.setState({isDashBoardDisabled: false})
        console.log("hahah :==>")
        console.log("Is Disabled ?"+this.state.isDashBoardDisabled)
    }
    onManualCheck2()
    {
        this.setState({isRefreshDisabled: true})
        console.log("hahah :==>")
        console.log("Is Disabled Refresh ?"+this.state.isRefreshDisabled)
    }

    render() 
    {
        const { activeStep } = this.state;
        const { classes } = this.props;
        const steps = getSteps();
        const { capsuleArray, isButtonDisabled, pipelineName, pipelineArray, 
            selectedPipelineIndex, temp ,value, isManualButtonDisabled,isPremiumDashBoardDisabled,installationLog} = this.state;
       // console.log('yahan active step ka value :')
       //console.log("value kya hai ?",isPremiumDashBoardDisabled)
        return(
            <div className={classes.root}>
                                    
                        <Stepper activeStep={activeStep} alternativeLabel id='main-stepper'>
                                {steps.map(label => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                      
                 
                    <Card >
                        <div className={classes.card} id="screen1">
                    <Typography  id='create-toolchain-text'>Create a new toolchain</Typography>
                    <Typography  id ="setup-your-projects">Setup your project's toolchain</Typography>
                     
                            <div>
                             <div id='flex-container' style={{marginBottom:16}}>
                                <Typography  id='label-name'>Name</Typography>
                                <Typography  id='label-stack-technology'>Select Stack Technology</Typography> 
                                </div>
                                

                                <div id='flex-container'>
                                    <InputBase
                                    // id="bootstrap-input"
                                    //style={{:placeholder: {color:red}}}
                                    placeholder="Enter a name"
                                    value={pipelineName}
                                    onChange={this.handleNameChange}
                                    classes={{
                                        // root: classes.bootstrapRoot,
                                        input: classes.bootstrapInput,
                                    }}
                                />
                            <div style={{marginLeft:110}} id='flex-container'>
                            {console.log("capsuleArray=====> ",capsuleArray)}
                                 {capsuleArray.map((capsule, index) => {
                                            // if(index===0)
                                            
                                    return (
                                         <div style={{ marginRight:'40px'}}>
                                            <CardActionArea key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'capsule-focus':'capsule-active'}
                                                onClick= {() => {this.handleCapsuleClick(capsule)}}>
                                            
                                            <span style={{marginLeft:10}}>{capsule==='DOTNET'?'.NET':[capsule==='JAVA'?'Java':capsule]}</span>
                                            <img src={imageMap[capsule]} style={{marginLeft:23}}/> 
                                           
                                            <CheckCircle style={{float: "right",fontSize:'16px'}} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/>
                                        
                                        </CardActionArea>
                                             </div>
                                        );
                                    })
                                 }
                                 </div>
                            </div>
                
                    <div style={{width: '100%', margin: 'auto'}}>
                        
                            <div>
                                <Typography id='label-available-toolchain' >
                                    Select one of the available toolchains
                                </Typography> 
                            </div>
                            <div style={{marginBottom: '25px'}}>
                            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" >
                                <Tab style={{textAlign:'left', minWidth:'60px', width:'75px',textTransform:"none",fontSize: 14,color: '#0066b3'}} label="Standard"/>
                                <Tab style={{textAlign:'left', minWidth:'80px', width:'80px',textTransform:"none"}} label="Premium"/>
                            </Tabs>
                            </div>
                            
                            {value === 0 && (
                                
                            <TabContainer>
                                {pipelineArray===null ? 'No Contents' :
                                <div style={{width:1120, height:215}}>
                                {pipelineArray.map((serviceArray, sIndex) => {
                                    //console.log('here',serviceArray,sIndex,selectedPipelineIndex );
                                    if(sIndex===0)
                                    return <div key={sIndex}>
                                   
                                        <div className={selectedPipelineIndex === sIndex ? 'glowing-border-cpl2':'border-cpl2'}
                                        onClick={()=>{this.handleSelectPipeline(serviceArray, sIndex)}}>
                                        <div style={{marginTop:23, marginBottom:26,marginLeft:32, display:'flex' }}>
                                            <div style={{width:673,display:'flex'}}>
                                                <Typography id='label-standard-toolchain'>Standard toolchain</Typography>
                                                <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Typology:&nbsp; </Typography> Open Source + HCL
                                                <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Tools:&nbsp; </Typography>7
                                             </div>
                                             <CheckCircle style={{marginLeft:373}} className={selectedPipelineIndex === sIndex ? 'check-visible':'check-hidden'}/>
                                        </div>
                                    <div style={{marginLeft:32, width:'95%'}}><StandardServiceAssembly serviceArray={serviceArray} sIndex= {sIndex}  bool={false} activeStep={activeStep}/></div>
                                        
                                        </div>
                                        </div>
                                        
                                    
                                })}
                                
                                
                                </div>
                                }
                            </TabContainer>   
                            )}

                            
            {value === 1 && <TabContainer> {pipelineArray===null ? <p>No Contents</p> :
                <div style={{width:1120, height:215}}>
                                {pipelineArray.map((serviceArray, sIndex) => {
                                    if(sIndex===1)

                                    if(serviceArray===null)
                                    {
                                       return <div >
                                        ;;;;;;
                                        <br/>
                                    </div>
                                    }
                                    else{

                                    return <div key={sIndex}>
                                   
                                    <div className={selectedPipelineIndex === sIndex ? 'glowing-border-cpl2':'border-cpl2'}
                                        onClick={()=>{this.handleSelectPipeline(serviceArray, sIndex)}}>
                                         <div style={{marginTop:23, marginBottom:26,marginLeft:32, display:'flex' }}>
                                        <div style={{width:673,display:'flex'}}>
                                        <Typography id='label-standard-toolchain'>Premium Tool Chain</Typography>
                                        <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Typology:&nbsp; </Typography> IBM + Jenkins
                                        <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Tools:&nbsp; </Typography>9
                                        </div>
                                        <CheckCircle style={{marginLeft:373}} className={selectedPipelineIndex === sIndex ? 'check-visible':'check-hidden'}/>
                                        </div>
                                        <div style={{marginLeft:32, width:'95%'}}><PremiumServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} bool={false} activeStep={activeStep}/></div>
                                        
                                        
                                       
                                        {/*                                         
    
                                            <div align="left" style={{width: '96%', margin: 'auto', marginTop: '10px',
                                                display: 'flex'}}>
                                    
                                                <table style={{width:'100%'}}>
                                                    <tbody>
                                                        <tr >
                                                            <td style={{width:'40%',fontWeight:'bold'}}>Premium Tool Chain</td>
                                                            <td style={{width:'30%',fontWeight:'bold'}}>Typology : 
                                                            <span style={{fontWeight:"normal"}}>IBM + Jenkins</span> </td>
                                                            <td style={{width:'30%',fontWeight:'bold'}}>Tools: 
                                                            <span style={{fontWeight:"normal"}}>9</span></td>
                                                            <td><CheckCircle style={{float: "right"}} className={selectedPipelineIndex === sIndex ? 'check-visible':'check-hidden'}/></td>
                                                            
                                                        </tr>
                                                        </tbody>
                                                </table>
                                            </div>
                                           
                                            
                                        
                                        <div style={{marginLeft:32}}><PremiumServiceAssembly serviceArray={serviceArray} sIndex= {sIndex} temp={temp} bool={false}/></div>
                                         */}
                                        </div>
                                        <br/>
                                    </div>}
                                })}
                                
                                
                            </div>
                             }
                            </TabContainer>}
                            
                            </div>
                </div>
                </div>
               {console.log("Moving to next page ........."+activeStep) }
                <div style={{width:"100%"}}>{this.getStepContent(activeStep,selectedPipelineIndex)}</div>
                
                
                    {activeStep === steps.length ? null : (
            <div style={{marginLeft:'40px',marginRight:'40px',marginTop:'32px', marginBottom:32}}>
              <Button style={{float: "right",marginLeft:"1rem",textTransform:"none"}}  disabled = {activeStep===0 ? isButtonDisabled :
              activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:*/ false}

              
             /* [activeStep===1? this.state.isd: this.state.isDashBoardDisabled]}*/
                    //style={{textTransform: "none"}}
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext.bind(this)}
                  className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                >
                 {activeStep===0 ? 'Next: Install': [activeStep === steps.length - 1 ? 'Go to DashBoard' : 
                 [activeStep === steps.length - 2 ? 'Next: check and deploy':'Next: manual install']]}
                </Button>
                {activeStep===1 ?
                <Button style={{float: "right",textTransform:"none"}} 
                variant="outlined" color="primary"
                  
                  onClick={this.handlePreviousSetup.bind(this)}
                  className={classes.button}
                  disabled={true}
                >
                  Previous: setup
                </Button> : [activeStep === 2 ?
                <Button style={{float: "right",textTransform:"none"}} 
                variant="outlined"
                color="primary"
                onClick={this.handlePreviousAutomated}
                className={classes.button}
                disabled={true}
              >
                 Previous : automated 
              </Button> : [activeStep === steps.length - 1 ?
                <Button style={{float: "right",marginLeft:"1rem",textTransform:"none"}} 
                variant="contained"
                color="primary"
                onClick={this.refreshpage.bind(this)}
                className={classes.button}
                disabled = {this.state.isRefreshDisabled}
              >
                 Refresh 
              </Button>: null]]}

                {activeStep=== steps.length-1 ?
                <Button style={{float: "right",textTransform:"none"}} disabled = {this.state.isPrevDisabled}
                variant="outlined" color="primary"
                  
                  onClick={this.handlePrevious.bind(this)}
                  className={classes.button}
                >
                  Previous:manual steps
                </Button>
                : [activeStep === steps.length - 1 ?
                    <Button style={{float: "right",textTransform:"none"}} 
                    variant="outlined"
                    color="primary"
                    onClick={this.handlePrevious1}
                    className={classes.button}
                  >
                     Previous 
                  </Button> : null]}
                <div>

                <div>
                <Button disabled 
                className = {activeStep>=1 ? 'check-visible':'check-hidden'}
                variant="outlined" color="primary"
                  onClick={this.handleCancel}
                  style={{textTransform:"none"}}
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

export default withStyles(styles)(SetupPage);