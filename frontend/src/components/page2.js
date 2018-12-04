import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

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
            <div  id="HomeScreen">
                    <ExpansionPanel defaultExpanded = {true}  style={{height:'500px'}}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>UCD-UCV Integration</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>Login to UCD tool</li>
                                <li>Click on “Settings”.</li>
                                <li>Under “Security” section  click on “token”.</li>
                                <li>Click on Create Token.</li>
                                <li>Select the user as admin</li>
                                <li>Give the data like Expiration date and Expiration time (the time for which you want the pipeline to be active for use)</li>
                                <li>And click on “save”.</li>
                                <li>You will get the Newly created token.</li>
                                <li>Copy the token and save it notepad.</li>
                                <li>Now Login to UCV tool.</li>
                                <li>Click on Setting, then go to Integrations and then Add Integrations.</li>
                                <li>Select Urban Code Deploy.</li>
                                <li>Give the name, UCD Server Url and the UCD access token (which you saved in notepad).</li>
                                <li>Click on save. Integration should be added, and the status should be successful.</li>
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);