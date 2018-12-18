import React, {Component} from 'react';
import '../static/css/SideBar.css';
import Typography from '@material-ui/core/Typography';
import Page2 from './page2';
import Page5 from './page5';
import '../static/css/SideBar.css';
import '../static/css/CreatePL1.css';
import '../static/css/CreatePL2.css';
import { Button} from '@material-ui/core';
import pdf from '../static/resources/StandardToolChain.pdf';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import '../static/css/SideBar.css';
class SideBarPremium extends Component {

    constructor()
{
    super();

    this.state = {
        steps: [{id: 1,name:'1. Steps to configure Urban Code Velocity', component: <Page2 />},
        {id: 2,name:'2. Steps to Install and Configure HCL Functional Tester', component:<Page5 />},
        {id: 3,name:'2. Steps to Install and Configure HCL Functional Tester', component:<Page5 />},
        {id: 4,name:'2. Steps to Install and Configure HCL Functional Tester', component:<Page5 />}],

        activeStep:1,
        isPrevDisabled:true,
        isNextDisabled:false,
        
    }

    
}

getNextStepDetails() {

    const { activeStep } = this.state;
    this.setState({
        activeStep: activeStep + 1,
        
      });
 }

 getPreviousStepDetails = ()=> {

    const { activeStep } = this.state;
    this.setState({
        activeStep: activeStep - 1,
      });

 }

 handlePrevious1 = () => {
     if(this.state.activeStep!=2)
     {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            isNextDisabled:false,
            //isPrevDisabled: true
          }));
     }
     else 
     {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            isNextDisabled:false,
            isPrevDisabled: true

        }));
     }
     
    
};
  handleNextClick() {
    if(this.state.activeStep===this.state.steps.length-1)
    {
        this.setState({
            isNextDisabled: true
        });
        this.getNextStepDetails();
    }
    if(this.state.activeStep>=1)
    {
        this.setState({
            isPrevDisabled: false
        });
        this.getNextStepDetails();
  }
   
}

 getStepContent(step) {
    switch (step) {
      case 0:
        return <div></div>;
    case 1:         
        return <div id="screen"><Page2/></div>;
    case 2:
        return <div id="screen"><Page5/></div>;
    case 3:
        return <div id="screen"><Page5/></div>;
    case 4:
        return <div id="screen"><Page5/></div>;
    default:
        return 'Unknown step';
    }
  }
 

    render(){
        const {steps, activeStep} = this.state;
       
        return(
            
            <div>
                <div id="sidebar">
                    <ul >
                        {steps.map(step=>

                        <li class={activeStep<step.id ? 'disabled' : null} style={{color:"#383838",fontWeight:"bold",padding:20}}>{step.name}</li>)}
                    </ul>
                </div>

                <div id="sidebarContent">
                    
                        <Typography style={{padding:20}}>
                            {this.getStepContent(activeStep)}
                        </Typography>
                </div>
                   
                    <Button style={{float:'right'}} disabled = {this.state.isNextDisabled}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNextClick.bind(this)}>
                        <ArrowForward></ArrowForward>
                    </Button>
                                
                    <Button style={{float:'right',marginRight: "1rem"}} disabled = {this.state.isPrevDisabled}
                        variant="contained"
                        color="primary"
                        onClick={this.handlePrevious1}>
                        <ArrowBack></ArrowBack>
                    </Button>
                    <a href={pdf} target="_blank">
                    
                        Open PDF Version <PictureAsPdf/>
                    
                    </a>
            </div>

        );
    }

}
export default SideBarPremium;