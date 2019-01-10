import React, {Component} from 'react';
import '../static/css/SideBar.css';
import Typography from '@material-ui/core/Typography';
import Page2 from './page2';
import Page5 from './page5';
import Page1 from './page1';
import { Button} from '@material-ui/core';
import pdf from '../static/resources/StandardToolChain.pdf';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

import ArrowLeft from '../static/images/extra/arrowleft.svg';
import ArrowRight from '../static/images/extra/arrowright.svg';
import PictureAsPdf from '../static/images/extra/document.svg';
class SideBarPremium extends Component {

    constructor()
{
    super();

    this.state = {
        steps: [{id: 1,name:'1. Steps to configure Urban Code Velocity', component: <Page2 />},
        {id: 2,name:'2. Steps to Install and Configure HCL Functional Tester', component:<Page5 />},
        {id: 3,name:'3. JTS And CLM Products Download and Installation', component:<Page1 />},
        ],

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
        return <Page2/>;
    case 2:
        return <Page5/>;
    case 3:
        return <Page1/>;
    
    default:
        return 'Unknown step';
    }
  }
 

    render(){
        const {steps, activeStep} = this.state;
       
        return(
            
            <div>
                <div style={{display: 'flex', border: '1px solid grey',marginLeft: 40,marginRight:40 }}>
                    <div id="sidebar" style={{width:280}} >
                   
                        {steps.map(step=>

                            <Typography class={activeStep<step.id ? 'disabled' : null} 
                                style={{color:"#383838",fontWeight:"bold",marginLeft:16,fontSize: 12, width: 250,height: 40,marginTop: 20}}>
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
                    <Button style={{float:'right',width:32, height:32}} //disabled = {this.state.isNextDisabled}
                    //className={this.state.isNextDisabled?'disabledButton':''}
                    className={this.state.isNextDisabled?'disabledButton':'arrowForward'}
                    id="arrowForward"
                        variant="contained"
                        //color="primary"
                        onClick={this.handleNextClick.bind(this)}>
                        <img src={ArrowRight} style={{height:13, width:16}}/>
                    </Button>
                                
                    <Button style={{float:'right',marginRight: "1rem",width:32, height:32}} disabled = {this.state.isPrevDisabled}

                        id="arrowBack"
                        variant="contained"
                        color="primary"
                        onClick={this.handlePrevious1}>
                        <img src={ArrowLeft} style={{height:13, width:16}}/>
                    </Button>
                    <a href={pdf} target="_blank">
                    
                        Open PDF Version <img src={PictureAsPdf} style={{marginLeft:16, height:16,width:12}}/>
                    
                    </a>
                </div>  
            </div>

        );
    }

}
export default SideBarPremium;