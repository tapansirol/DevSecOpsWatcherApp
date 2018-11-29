import React, { Component } from 'react';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
import StepZilla from "react-stepzilla";
import { Button } from '@material-ui/core';


export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.sampleStore = {
      email: '',
      gender: '',
      savedToCloud: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  checkName() {

    console.log("kya value hai bhai ?", localStorage.getItem("pipelineName"))

  }

  render() {
    const steps =
    [
        {name: 'Step 1', component: <Page1 />},
        {name: 'Step 2', component: <Page2 />},
        {name: 'Step 3', component: <Page3 />},
        {name: 'Step 4', component: <Page4 />},
        {name: 'Step 5', component: <Page5 />},
        {name: 'Step 6', component: <Page6 />},
    ]

    

    return (
      <div className='example'>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[3]}
            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
           />
           <Button onClick={this.checkName}>Button</Button>
        </div>
      </div>
    )
  }
}