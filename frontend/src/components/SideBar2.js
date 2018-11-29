import React, {Component} from 'react';
import '../static/css/SideBar.css';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StepWizard from 'react-step-wizard';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';


const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });


  const steps =
  [
    {name: 'Step 1', component: <Page1 />},
    {name: 'Step 2', component: <Page2 />},
    {name: 'Step 3', component: <Page3 />},
    {name: 'Step 4', component: <Page4 />},
    {name: 'Step 5', component: <Page5 />},
    {name: 'Step 6', component: <Page6 />},
    
  ]
 
class SideBar extends Component {


    render(){
        const { classes } = this.props;
        return(
            <div>


                
                <div>   
 
                    <h2>Step {classes.currentStep}</h2>
                    <p>Total Steps: {classes.totalSteps}</p>
                    <p>Is Active: {this.props.isActive}</p>
                    
                    <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                    <p><button onClick={this.props.nextStep}>Next Step</button></p>
                    <p><button onClick={()=>this.props.goToStep(2)}>Step 2</button></p>
                    <p><button onClick={this.props.firstStep}>First Step</button></p>
                    <p><button onClick={this.props.lastStep}>Last Step</button></p>
                </div>
                
            
            
            <StepWizard>
            
          </StepWizard>
        </div>

        );
    }

}
export default withStyles(styles)(SideBar);