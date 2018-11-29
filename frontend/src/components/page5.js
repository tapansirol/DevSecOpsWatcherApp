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
      overflow: "scroll"
    }
  });
class page1 extends Component {

    render()
    {
        const {classes} =  this.props;
        return(
            <div  id="HomeScreen">
                    <ExpansionPanel defaultExpanded = {true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to add the App in UCD too  from Jenkins source and UCD source.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Typography>
                                <ul>
                                    <li>Login to Urban Code Velocity tool with valid username and password.</li>
                                    <li>Click on Pipelines tab and click on "create pipeline" link.</li>
                                    <li>Give the Name, Description and select the Team and click on Save button.</li>
                                    <li>Click on "Add app" and select the option as "UrbanCodeDeploymemt" and give the "application Name" and click on Save button.</li>
                                    <li>Click on "Add app" and select the option as "Jenkins" and give the "application Name" and click on Save button.</li>
                                    <li>Click on plus sign under the Input section.</li>
                                    <li>Under the “Create version”, select automatically and click on “Continue”.</li>
                                    <li>Select the Job name from Jenkins and click on “save” button. (Initially the status of job will be “Not Yet Run”.</li>
                                    <li>Login to Jenkin tool.</li>
                                    <li>Navigate to the Pipeline solution for which you need to see the UCV reports.</li>
                                    <li>Click on “Build Now” on the LHS.</li>
                                    <li>Navigate to the UCV tool and check for the App created for Jenkins. It should display the recent Build number with green symbol.</li>
                                    <li>Check for the App created for Urban Code Deployment, It should display Snapshot version from Urban Code Deployment tool.</li>
                                    
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to create the Report   in UCV tool.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Typography>
                                <ul>
                                    <li>Login to Urban Code Velocity tool with valid username and password.</li>
                                    <li>Click on “Reports” tab.</li>
                                    <li>Click on “Add report” link.</li>
                                    <li>Select the type of Report from the “Type of Report”.e.g “Custom”</li>
                                    <li>Give the Report Name in “Report name” text area.</li>
                                    <li>Give the brief description about the report in “Description”</li>
                                    <li>Click on “Add” button. Report should be created successfully.</li>
                                    <li>Now click on the Report name which you created just now.</li>
                                    <li>Click on “Add Card”</li>
                                    <li>Under “Select a Card”, select the type of options for e.g “Deployment Count”.</li>
                                    <li>In “Time Period” field, select the time duration for e.g. ”Last 30 days”.</li>
                                    <li>In “Environment” field, select Environment Name, for e.g. “All Environments”.</li>
                                    <li>Under the Application field, choose the application name, e.g. Jpetstore app.</li>
                                    <li>In “Team” field, select “all teams”.</li>
                                    <li>In “Line of Business”, select “Not Mapped” and click on “Add”. So Now User could see the details like Application deployment, Successful Deployments and Failed Deployments etc.</li>
                                    <li>Click on “Add Chart” link.</li>
                                    <li>Give the Title name in the “Title”.</li>
                                    <li>Select the type of chart for e.g. Total Application Deployment Counts by environment”.</li>
                                    <li>Select the time from “Time period” selection box e.g. “last 30 days” and click on “Add button. User could see the Report which created in graphical format bottom of the page.</li>
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);