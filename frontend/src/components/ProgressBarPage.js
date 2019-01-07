import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';


class ProgressBarPage extends Component
{

    constructor()
    {
        super();
        this.state = {
           flag: null
        }

    }

    updateValue(value)
    {
        console.log("Value Inside PBP"+value);

        this.setState({flag: value})
    }
    render()
    {

        const {flag} = this.state;
        const { classes } = this.props;
        return(
                    flag===null ?

                        <Card id="automatedProgress">
                           <CircularProgress id="progressButton"/>
                            <Typography  id = "successText">Installation in Progress</Typography>
                        </Card>

                        : [flag===false ?
                            <Card id="manualFailure">
                                 <HighlightOff id="automatedFailureButton" />
                                 <Typography id = "automatedFailureText">
                                     Some tools were not installed correcly. Re-run the script or <a href="">contact your Admin</a> for help.
                                 </Typography>
                            </Card> 
                        :

                        <Card id="manualSuccess">
                                     <CheckCircle id="successButton"/>
                                     <Typography  id = "successText">
                                     Automated installation successful
                                     </Typography>
                                 </Card>

                        
                        ]

            );

    }

       
    

}

export default ProgressBarPage;