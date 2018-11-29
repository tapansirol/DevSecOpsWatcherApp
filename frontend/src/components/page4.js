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
                            <Typography>Creation of process in UCD:</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>

                          <Typography>  Precondition: Download the “Tomcat Apache UCD Plugin” and install in UCD tool.</Typography>
                            <Typography>
                                <ol>
                                    <li>Login to UCD tool.</li>
                                    <li>Navigate to the “Settings” tab.</li>
                                    <li>Under Automation section, link on “Automation Plugins”.</li>
                                <li>Click on “Load plugin”.</li>
                                <li>Upload Tomcat 7.868953.zip.</li>
                                <li>Link: <a>https://developer.ibm.com/urbancode/plugin/tomcat-ibmucd/</a></li>

                                </ol>
                            <ul>
                                <li>Login to the UCD tool with valid username and password.</li>
                                <li>Click on “Components” tab.</li>
                                <li>Click on the “Component name” for eg. Jenkin-jpet-component.</li>
                                <li>Click on  the “Processes” tab.</li>
                                <li>Click on “Create Process”.</li>
                                <li>In “Create Process” pop-up, give the Process name and click on “Save” button.</li>
                                <li>Click on the “Design” tab and design the process for the component.</li>
                                <li>Click on “Download Artifacts” and drag and drop after the “Start” step. This can be found under RepositoriesDownload Artefacts</li>
                                <li>Click on “Start Tomcat” and drag and drop after “Download Artifacts” step. This can be found under Application ServerStart Tomcat.</li>
                                <li>Click on Edit symbol, for “Start Tomcat”.</li>
                                <li>Look for the “launcher” text area and give the path. (This is the path Apache Tomcat Server is mounted.) and click on “save” button.</li>
                                <li>Click on “Copy Directory” and drag and drop after the “Start Tomcat “step. This can be found under UtilitiesFile UtilsCopy Directory.</li>
                                <li>Click on Edit symbol for “Copy Directory” and feed the following data and then click on “OK” button.</li>
                                <li>Name: Copy Directory</li>
                                <li>Source Directory: “.” (here. Specifies current working directory)</li>
                                <li>Destination Directories: Apache Server Static Path.</li>
                                <li>Make sure that every component of the design is connected with each other.</li>
                               
                                
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to Create Snapshot in Urban Code Deploy.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>

                          <Typography>
                            <ul>
                                <li>Click on "Applications" tab.
                                </li><li>Click on Application name, i.e JPetStore App.
                                </li><li>Click on "Snapshots" link.
                                </li><li>Click on "create snapshot" link.
                                </li><li>Give the Snapshot name for e.g Test-Pipeline and click on "Save" button.
                                </li><li>Click on "Add" link , next to the Component name, ie. jenkins-jpet-component.
                                </li><li>Click on "latest available".
                                </li><li>Click on "Application" tab.
                                </li><li>Click on Application name i.e "JPetStore-App".
                                </li><li>Click on "Run button" next to the environment name, i.e Test.
                                </li><li>In the "Run Process on Test" tab, select the SnapshotName (which you created just now ) from "Snapshot" dropdown and click on submit.
                                </li><li>Now go to UCV tool.
                                </li><li>Click on "Pipeline" tab.
                                </li><li>Click on the "Pipeline name", i.e JPetStore</li>
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);