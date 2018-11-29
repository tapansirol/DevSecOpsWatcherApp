import React, {Component} from 'react';
import '../static/css/SideBar.css';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
import '../static/css/SideBar.css';
import '../static/css/CreatePL1.css';
import '../static/css/CreatePL2.css';
import { Button} from '@material-ui/core';
import pdf from '../static/resources/ReleaseNotes.docx';
import Try1 from './Try1';

class SideBar3 extends Component {

    constructor()
{
    super();

    this.state = {
        steps: [{id: 1,name:'Docker-Container', component: <Page1 />},
        {id: 2,name:'UCD-UCV Integration', component: <Page2 />},
        {id: 3,name:'Jenkins-UCD Integration', component: <Page3 />},
        {id: 4,name:'Creation of process in UCD:', component: <Page4 />},
        {id: 5,name:'Configure the UCV tool to see the Reports', component:<Page5 />},
        {id: 6,name:'Configure the UCV ', component: <Page6 />},],

        activeStep:1,
        
    }

    
}

getNextStepDetails() {

    console.log('Dekho yahan data hai kya ?')

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

 getStepContent(step) {
    switch (step) {
      case 0:
        return <div></div>;
    case 1:
        return <div id="screen"><Page1/></div>;
    case 2:         
        return <div id="screen"><Page2/></div>;
    case 3:
        return <div id="screen"><Page3/></div>;
    case 4:
        return <div id="screen"><Page4/></div>;
    case 5:
        return <div id="screen"><Page5/></div>;
    case 6:
        return <div id="screen"><Page6/></div>;
    default:
        return 'Unknown step';
    }
  }
 

    render(){
        const {steps, activeStep} = this.state;
       
        return(
            
            <div>
                <div id="sidebar">
                    <div>
                    <ul>
                       
                        {steps.map(step=>

                        <li class={activeStep<step.id ? 'disabled' : null} >{step.name}</li>)}
                    </ul>
                    </div>
                    <div style={{position:'absolute',bottom:'0',right:'0'}}>
                   
                        <a href={pdf} ><button>Open PDF Version</button></a>
                        </div>
                
                </div>

                <div id="sidebarContent">
               
                <Typography >{this.getStepContent(activeStep)}</Typography>
                
                           
                               {
                                   /*
                               
                              
                                <Button style={{float:'right'}}
                                variant="contained"
                                color="primary"
                                onClick={this.getNextStepDetails} disabled = {activeStep===steps.length}>Next</Button>
                              
                                <Button style={{float:'right'}} 
                                variant="contained"
                                color="primary"
                                onClick={this.getPreviousStepDetails} disabled = {activeStep===1}>Previous</Button>

                               */}
                            
                           
                   
                </div>

                

                 
                
                
            </div>

        );
    }

}
export default SideBar3;