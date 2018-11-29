import React, {Component} from 'react';
import '../static/css/SideBar.css';

//import { withStyles } from '@material-ui/core/styles';


import StepZilla from "react-stepzilla";
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
import '../static/css/SideBar.css';



/*const styles = theme => ({
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
    
  ]*/
class SideBar1 extends Component {
constructor()
{
    super();

    this.state = {
        steps: [{name: 'Step 1', component: <Page1 />},
        {name: 'Step 2', component: <Page2 />},
        {name: 'Step 3', component: <Page3 />},
        {name: 'Step 4', component: <Page4 />},
        {name: 'Step 5', component: <Page5 />},
        {name: 'Step 6', component: <Page6 />},]
    }

    
}
    

    render(){
        const {steps} = this.state;
        return(
            <div>
          <div className='step-progress' >
        <StepZilla steps={steps} />
    </div>
          </div>
        );
       
    }
                
}
export default /*withStyles(styles)(*/SideBar1;