import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import CardActionArea from '@material-ui/core/CardActionArea';
import Java_IMG from '../static/images/capsules/new/java.JPG';
import Dotnet_IMG from '../static/images/capsules/new/dotnet.JPG';
import Sap_IMG from '../static/images/capsules/new/sap.JPG';
import Cpp_IMG from '../static/images/capsules/new/c++.JPG';
//Icons imported
import checked from '../static/images/extra/checked.svg'
import Embedded_IMG from '../static/images/capsules/new/embedded.JPG';
import APIService from '../util/APIService';
import { Button} from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StandardServiceAssembly from './StandardServiceAssembly';
import PremiumServiceAssembly from './PremiumServiceAssembly';
import '../static/css/Start.css';
import AutomatedToolChain from './AutomatedToolChain';
import ManualInstallation from './ManualInstallation';
import ManualInstallationCheck from './ManualInstallationCheck';
import ManualInstallationPremium from './ManualInstallationPremium';





const imageMap = {
    JAVA: Java_IMG,
    DOTNET: Dotnet_IMG,
    SAP: Sap_IMG,
    CPP: Cpp_IMG,
    EMBEDDED: Embedded_IMG,
}


//import { withStyles } from '@material-ui/core/styles';


const styles = theme =>({



    //Adding for tabs styling

    tabsIndicator: {
        backgroundColor: '#1890ff',
      },
      tabRoot: {

        '&:hover': {
          color: '#00518f',
          opacity: 1,
        },
        '&$tabSelected': {
          color: '#00518f',
          //fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#00518f',
          outline: 'none'
        },
      },

      //Ending tabs styling
   
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
            isRefreshDisabled: false,
            cleanupMessage: '',
            stopMessage: '',
            variant: 'outlined'
            
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
            }).catch(err => console.log('There was an error:'));

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
        
                    this.timer = setInterval(() => 

                    {
                        if(localStorage.getItem("installationLog")!==null && localStorage.getItem("installationLog").includes('***COMPLETED***'))
                        {
                            console.log("Inside IF condn",this.timer)
                            clearInterval(this.timer)
                        }
                        else{
                            console.log("Inside ELSE condn",this.timer)
                            this.getInstallationLog(postobj)
                        }
                    }
                    , 5000);
                
                
        
        

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
    fetch('api/stopServices')
            .then(response => response.text())
            .then(message => {
               
                this.setState({stopMessage: JSON.parse(message)});
            }).catch(err => console.log('There was an error:'));
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
    this.setState({
      activeStep: 0,
    });

    fetch('api/cleanUp')
            .then(response => response.text())
            .then(message => {
               
                this.setState({stopMessage: JSON.parse(message)});
            }).catch(err => console.log('There was an error:'));

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
    changeHover()
    {
        this.setState({variant:'contained'})
    }
    resetHover()
    {
        this.setState({variant:'outlined'})
    }
    getMouseOver()
    {
        document.getElementById('pbutton').style.background='#00518f';
    }
    getMouseOut()
    {
        document.getElementById('pbutton').style.background='#0066b3';
    }
    getMouseOverPrev()
    {
        document.getElementById('sbutton').style.background='#00518f';
        document.getElementById('sbutton').style.color='#ffffff';
    }
    getMouseOutPrev()
    {
        document.getElementById('sbutton').style.background='#ffffff';
        document.getElementById('sbutton').style.color='#0066b3';
    }
    getMouseOverCancel()
    {
        document.getElementById('scbutton').style.background='#00518f';
        document.getElementById('scbutton').style.color='#ffffff';
    }
    getMouseOutCancel()
    {
        document.getElementById('scbutton').style.background='#ffffff';
        document.getElementById('scbutton').style.color='#0066b3';
    }
    getFocus()
    {
        console.log("tab clicked")
        document.getElementById('tabId').style.outline='none';
    }

    render() 
    {
        const { activeStep } = this.state;
        const { classes } = this.props;
        const steps = getSteps();
        const { capsuleArray, isButtonDisabled, pipelineName, pipelineArray, 
            selectedPipelineIndex, temp ,value, isManualButtonDisabled,isPremiumDashBoardDisabled,installationLog} = this.state;
        let varnt = 'outlined';

       
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
                                         <div style={{ marginRight:'40px'}} >
                                            <CardActionArea key= {index} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'capsule-focus':'capsule-active'}
                                                onClick= {() => {this.handleCapsuleClick(capsule)}} id = {capsule!=='JAVA' ? 'disableCapsule':''}>
                                            
                                            <span style={{marginLeft:10,fontFamily:'Roboto'}}>{capsule==='DOTNET'?'.NET':[capsule==='JAVA'?'Java':capsule]}</span>
                                            <img src={imageMap[capsule]} style={{marginLeft:23}}/> 
                                           <img src ={checked } style={{float: "right", width:13,height:13,marginRight:5}} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/>
                                            {/* <CheckCircle style={{float: "right",fontSize:'16px'}} className={this.state.selectedCapsule && capsule === this.state.selectedCapsule ? 'check-visible':'check-hidden'}/> */}
                                        
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
                            <Tabs value={value} onChange={this.handleChange} classes={{indicator: classes.tabsIndicator }}>
                                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} style={{fontFamily:'Roboto',height:20, textAlign:'left', minWidth:'60px', width:'75px',textTransform:"none",fontSize: 14,}} label="Standard"/>
                                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} style={{fontFamily:'Roboto',height:20,textAlign:'left', minWidth:'80px', width:'80px',textTransform:"none",fontSize: 14,}} label="Premium"/>
                            </Tabs>
                            </div>
                            {console.log('dekh le 7879',pipelineArray )}
                                {pipelineArray.length===0 || pipelineArray==='' ?
                                <h5 style={{color:'red'}}> There is some error loading the pipeline. Please check if server is running.
                                    Else contact to the administrator. </h5> :''}
                            
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
                                            <div style={{width:673,display:'flex', fontFamily:'Roboto'}}>
                                                <Typography id='label-standard-toolchain'>Standard toolchain</Typography>
                                                <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Typology:&nbsp; </Typography> Open Source + HCL
                                                <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Tools:&nbsp; </Typography>7
                                             </div>
                                             <img src={checked} style={{marginLeft:373,height:13,width:13}} className={selectedPipelineIndex === sIndex ? 'check-visible':'check-hidden'}/>
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
                                        <div style={{width:673,display:'flex',fontFamily:'Roboto'}}>
                                        <Typography id='label-standard-toolchain'>Premium Tool Chain</Typography>
                                        <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Typology:&nbsp; </Typography> IBM + Jenkins
                                        <Typography style={{marginLeft:100}} id='label-standard-toolchain'>Tools:&nbsp; </Typography>9
                                        </div>
                                        <img src={checked} style={{marginLeft:373,height:13,width:13}} className={selectedPipelineIndex === sIndex ? 'check-visible':'check-hidden'}/>
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
              {/* <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}}  //disabled = {activeStep===0 ? isButtonDisabled :
            //   activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:false}
               {/*   variant="contained"
                  color="primary"
                  id={activeStep===0 ? 
                        [isButtonDisabled?"pdisabledbutton":"pbutton"]
                    :[activeStep>2 ? 
                        [this.state.isDashBoardDisabled?"pdisabledbutton":"pbutton"]
                        :'']}
                  
                  className = 'disablePrimaryButton'
                  onClick={this.handleNext.bind(this)}
                  className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                  onMouseOver={this.getMouseOver.bind(this)}
                  onMouseOut={this.getMouseOut.bind(this)}
                >
                 {activeStep===0 ? 'Next: Install': [activeStep === steps.length - 1 ? 'Go to DashBoard' : 
                 [activeStep === steps.length - 2 ? 'Next: check and deploy':'Next: manual install']]}
                </Button> */}
                {activeStep===0 ?

                    <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}}  //disabled = {activeStep===0 ? isButtonDisabled :
                    //   activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:false}
                        variant="contained"
                        color="primary"
                        id={isButtonDisabled?"pdisabledbutton":"pbutton"}
                        
                        //className = 'disablePrimaryButton'
                        onClick={this.handleNext.bind(this)}
                        className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                        onMouseOver={this.getMouseOver.bind(this)}
                        onMouseOut={this.getMouseOut.bind(this)}
                        >
                        Next: Install
                        </Button>
                :
                [activeStep === steps.length - 2 ?

                    <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}}  //disabled = {activeStep===0 ? isButtonDisabled :
                    //   activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:false}
                        variant="contained"
                        color="primary"
                        id={isButtonDisabled?"pdisabledbutton":"pbutton"}
                        
                        //className = 'disablePrimaryButton'
                        onClick={this.handleNext.bind(this)}
                        className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                        onMouseOver={this.getMouseOver.bind(this)}
                        onMouseOut={this.getMouseOut.bind(this)}
                        >
                        Next: check and deploy
                        </Button>
                        :[activeStep === steps.length - 1 ?
                            <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}}  //disabled = {activeStep===0 ? isButtonDisabled :
                                //   activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:false}
                                variant="contained"
                                color="primary"
                                id={this.state.isDashBoardDisabled?"pdisabledbutton":"pbutton"}
                                
                                //className = 'disablePrimaryButton'
                                onClick={this.handleNext.bind(this)}
                                className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                                onMouseOver={this.getMouseOver.bind(this)}
                                onMouseOut={this.getMouseOut.bind(this)}
                                >
                                    Go To DashBoard
                                </Button>
                        
                        :
                        <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}}  //disabled = {activeStep===0 ? isButtonDisabled :
                        //   activeStep>2 ? this.state.isDashBoardDisabled: /* activeStep===1?this.state.isd:false}
                        variant="contained"
                        color="primary"
                        id={isButtonDisabled?"pdisabledbutton":"pbutton"}
                        
                        //className = 'disablePrimaryButton'
                        onClick={this.handleNext.bind(this)}
                        className={activeStep === steps.length - 2 ? '':classes.marginRight20}
                        onMouseOver={this.getMouseOver.bind(this)}
                        onMouseOut={this.getMouseOut.bind(this)}
                        >
                            Next: Manual Install
                        </Button>
                        ]
                ]
                
                }











                {activeStep===1 ?
                <Button style={{float: "right",textTransform:"none",fontFamily:'Roboto',borderRadius:0}} className="secondary"
                variant={this.state.variant} color="primary"
                  
                  onClick={this.handlePreviousSetup.bind(this)}
                  className={classes.button}
                  //onMouseEnter={this.changeHover.bind(this)}
                  //onMouseLeave={this.resetHover.bind(this)}
                  //disabled={true}
                  //style={{background: red}}
                  id="sbutton"
                  onMouseOver={this.getMouseOverPrev}
                  onMouseOut={this.getMouseOutPrev}
                  
                  
                >
                  Previous: setup
                </Button> : [activeStep === 2 ?
                <Button style={{float: "right",textTransform:"none",fontFamily:'Roboto',borderRadius:0}} 
                variant="outlined"
                color="primary"
                onClick={this.handlePreviousAutomated}
                className={classes.button}
                disabled={true}
                id="sbutton"
                onMouseOver={this.getMouseOverPrev}
                onMouseOut={this.getMouseOutPrev}
              >
                 Previous : automated 
              </Button> : [activeStep === steps.length - 1 ?
                <Button style={{float: "right",marginLeft:"1rem",textTransform:"none",fontFamily:'Roboto',borderRadius:0}} 
                variant="contained"
                color="primary"
                id={this.state.isRefreshDisabled?"pdisabledbutton":"pbutton"}
                onClick={this.refreshpage.bind(this)}
                className={classes.button}
                //disabled = {this.state.isRefreshDisabled}
              >
                 Refresh 
              </Button>: null]]}

                {activeStep=== steps.length-1 ?
                <Button style={{float: "right",textTransform:"none",fontFamily:'Roboto',borderRadius:0}} //disabled = {this.state.isPrevDisabled}
                variant="outlined" color="primary"
                  
                  onClick={this.handlePreviousAutomated.bind(this)}
                  className={classes.button}
                  id="sbutton"
                  onMouseOver={this.getMouseOverPrev}
                  onMouseOut={this.getMouseOutPrev}
                >
                  Previous:manual steps
                </Button> :null}
               
                

                <div>
                <Button  
                className = {activeStep>=1 ? 'check-visible':'check-hidden'}
                variant="outlined" color="primary"
                  onClick={this.handleCancel}
                  style={{textTransform:"none",fontFamily:'Roboto',borderRadius:0}}
                //  className={classes.button}
                id="scbutton"
                  onMouseOver={this.getMouseOverCancel}
                  onMouseOut={this.getMouseOutCancel}
                >
                  Cancel
                </Button>
                
              
                
              </div>
            </div>
          )}
          
          </Card>
          
           </div>
   
        );
    }

}

export default withStyles(styles)(SetupPage);