import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import error from '../static/images/extra/error.svg';
import loading from '../static/images/extra/loading.svg';
import success from '../static/images/extra/success.svg';


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
                           <img src={loading} id="progressButton"/>
                            <Typography  id = "successText">Installation in Progress</Typography>
                        </Card>

                        : [flag===false ?
                            <Card id="manualFailure">
                                 <img src={error} id="automatedFailureButton" />
                                 <Typography id = "automatedFailureText">
                                     Some tools were not installed correcly. Re-run the script or <a href="">contact your Admin</a> for help.
                                 </Typography>
                            </Card> 
                        :
                            <div>{this.props.setnextButton}
                                <Card id="manualSuccess">
                                     <img src={success} id="successButton"/>
                                     <Typography  id = "successText">
                                     Automated installation successful
                                     </Typography>
                                 </Card>
                            </div>

                        
                        ]

            );

    }

       
    

}

export default ProgressBarPage;