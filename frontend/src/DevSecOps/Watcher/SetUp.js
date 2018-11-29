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

import Java_IMG from '../../static/images/capsules/new/java.JPG';
import Dotnet_IMG from '../../static/images/capsules/new/dotnet.JPG';
import Sap_IMG from '../../static/images/capsules/new/sap.JPG';
import Cpp_IMG from '../../static/images/capsules/new/c++.JPG';
import Embedded_IMG from '../../static/images/capsules/new/embedded.JPG';
import '../CSS/SetUp.css'







const imageMap = {
    JAVA: Java_IMG,
    DOTNET: Dotnet_IMG,
    SAP: Sap_IMG,
    CPP: Cpp_IMG,
    EMBEDDED: Embedded_IMG,
}


function getSteps() {
    return ['Setup', 'Automated Check', 'Manual', 'Installation Status'];
  }


  class Setup extends Component {


    constructor()
    {
        super();

        this.state = {
            activeStep:0
        }

    }

    render()
    {
        const activeStep = this.state;
        const steps = getSteps();
        return(
            <div align="center">
                <div style={{width:'40%'}} >
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => 
                            {
                                return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                        );
                            })
                        }
                    </Stepper>
                </div>
                <div id="Rectangle">
                <div style={{marginTop:"40px"}}>
                <Typography id="Create-New-ToolChain" >
                            Create a New tool Chain
                        </Typography>
                </div>
                       

                </div>
            </div>
            
        )
    }

  }

  export default Setup;