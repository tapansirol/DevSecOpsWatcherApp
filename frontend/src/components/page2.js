import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
const styles = theme => ({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    exp: {
      height: "100%",
      //overflow: "scroll"
    }
  });
class page1 extends Component {

    render()
    {
        const { classes } = this.props;
        return(
            <div  id="HomeScreen" style={{height:400}}>
                <Typography style={{fontWeight:'bold', marginLeft:24,marginTop:24,marginBottom:24}}>1- Integration of the tools</Typography>
                    <ExpansionPanel defaultExpanded = {true} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Jenkins-UCV Integration</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>Login to Jenkins tool in browser URL: http://IP-address:9292
                                </li><li>Enter the username and password
                                </li><li>When first time user logins to Jenkins, he may get the “Install Suggested Plugin”, when user click on this link, it will install all the necessary plugins.
                                </li><li>Jenkins Url will be auto populated, click on “Save and Finish”.
                                </li><li>Now Restart the Jenkins tool.
                                </li><li>The above two steps does not appear all the times.If it doesn’t appear, just go ahead with the next steps as follows.
                                </li><li>Click on Manage Jenkins.
                                </li><li>Click on Manage Plugins.
                                </li><li>Under “Available”, search for “Urban Code Velocity” plugin.
                                </li><li>Click on “Install without restart”.
                                </li><li>Now check the checkbox for “Restart Jenkins when no jobs are running”.
                                </li><li>Click on “Manage Jenkins”.
                                </li><li>Click on “Configure system”.
                                </li><li>Under Urban Code Velocity section enter the following details:
                                </li><li>	Integration Id
                                </li><li>	Integration Token
                                </li><li>    Velocity Base Urls
                                </li><li>Jenkins Credentials.this need to be added before, just select the credentials from the list.
                                </li><li>And click on Save and Restart the Jenkins after UCV plugin installation.
                                </li>
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>UCD-UCV Integration</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>Login to UCD tool
                                </li><li>Click on “Settings”.
                                </li><li>Under “Security” section  click on “token”.
                                </li><li>Click on Create Token.
                                </li><li>Select the user as admin
                                </li><li>Give the data like Expiration date and Expiration time (the time for which you want the pipeline to be active for use)
                                </li><li>And click on “save”.
                                </li><li>You will get the Newly created token.
                                </li><li>Copy the token and save it notepad.
                                </li><li>Now Login to UCV tool.
                                </li><li>Click on Setting, then go to Integrations and then Add Integrations.
                                </li><li>Select Urban Code Deploy.
                                </li><li>Give the name, UCD Server Url and the UCD access token (which you saved in notepad).
                                </li><li>Click on save. Integration should be added, and the status should be successful.
                                </li>
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);