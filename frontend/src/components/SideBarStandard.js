import React, {Component} from 'react';
import '../static/css/SideBar.css';
import Typography from '@material-ui/core/Typography';
import Page2 from './page2';
import Page5 from './page5';
import { Button} from '@material-ui/core';
import pdf from '../static/resources/StandardToolChain.pdf';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';

class SideBarStandard extends Component {

    constructor()
{
    super();

    this.state = {
        steps: [{id: 1,name:'1. Steps to configure Urban Code Velocity', component: <Page2 />},
        {id: 2,name:'2. Install and Configure HCL Functional Tester', component:<Page5 />},],

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
     if(this.state.activeStep!=1)
     {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            isNextDisabled:false,
            isPrevDisabled: true
          }));
     }
     else
     {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            isNextDisabled:false,

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
        return <Page2/>;
    case 2:
        return <Page5/>;
    default:
        return 'Unknown step';
    }
  }
 

    render(){
        const {steps, activeStep} = this.state;
       
        return(
            
            <div >
                <div style={{display: 'flex', border: '1px solid grey',marginLeft: 40,marginRight:40 }}>
                    <div id="sidebar" >
                    
                        {steps.map(step=>

                            <Typography class={activeStep<step.id ? 'disabled' : null} 
                                style={{color:"#383838",fontWeight:"bold",marginLeft:16,fontSize: 12, width: '80%',height: 40,marginTop: 10}}>
                                {step.name}
                            </Typography>
                        )}
                        
                    </div>

                    <div>
                    
                        <Typography>
                            {this.getStepContent(activeStep)}
                        </Typography>
                    </div>
                </div>
                <div style={{marginLeft:40,marginRight:40,marginTop: 24, marginBottom:24}}>
                    <Button style={{float:'right'}} disabled = {this.state.isNextDisabled}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNextClick.bind(this)}>
                        <ArrowForward></ArrowForward>
                    </Button>
                                
                    <Button style={{float:'right',marginRight: "0.75rem"}} disabled = {this.state.isPrevDisabled}
                        variant="contained"
                        color="primary"
                        onClick={this.handlePrevious1}>
                        <ArrowBack></ArrowBack>
                    </Button>
                    <a href={pdf} target="_blank">
                    
                        Open PDF Version <PictureAsPdf/>
                    
                    </a>
                </div>
            </div>

        );
    }

}
export default SideBarStandard;