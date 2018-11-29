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
                            <Typography>Steps to Create TestScipt in HFT by recording.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>                        
                            <Typography>
                                <ul>
                                <li>Open HCL Functional Tester tool</li>
                                <li>Select the TestWorkBench perspective.</li>
                                <li>Click on File tab, select New, and then select TestWorkBench project.(File-->New-->TestWorkBench Project)</li>
                                <li>Give the project name, click on "Finish", </li>
                                <li>Select "Web UI Test" and then select "Next".</li>
                                <li>Give a TestName and click on "Finish".</li>
                                <li>Select the Browser e.g Google Chrome , click on "Next" and "Finish".</li>
                                <li>Goto the Application Url and perform some tests and close the Browser.</li>
                                <li>User can see "Test Generation completed" pop-up and click on "Open Test"</li>
                                <li>Open the test script from Test Navigator and click on "Run Test".</li>
                                <li>Now Run the test script from TestWorkBench.</li>
                                <li>Once the test is complete , automatically the Test Results will be opened.</li>

                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to Create TestScipt in HFT by recording.</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ul>
                                    <li>Download the HCL Web UI Tester(HCL Functional Tester WEb UI 9.2.0.1 Jenkins Plugin) and save it.</li>
                                    <li>Login to Jenkins tool as admin.</li>
                                    <li>Click on "Manage Jenkins" on the LHS.</li>
                                    <li>Click on "Manage Plugins".</li>
                                    <li>Goto "Advanced" tab, click on "Choose File"  browse the path for HCL Web UI Tester  and then click on "Upload".</li>
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to create Slave Node in jenkins</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ul>
                                <li>Login to Jenkins tool as admin.
                                </li><li>Click on "Manage Jenkins".
                                </li><li>Click on "Manage Nodes".
                                </li><li>Click on "New Node".
                                </li><li>Give a Node Name, select "Permanent Agent" check box and click on "OK".
                                </li><li>Now open a browser and copy paste the below Url to get the “agent.jar” which will go to the “Downloads” folder. ipaddressofjenkins:portnumber/jnlpJars/agent.jar
                                </li><li>Now navigate to the Nodes name which you have created.
                                </li><li>Click on the “Launch” link, which will launch Agent slave.
                                </li><li>Now open the cmd , navigate to Downloads section and  type the command which you see below the “Run from agent commandline”
                                </li><li>Click on “Configure link”.
                                </li><li>Under Remote root directory, give the path for the Jenkins e.g C:\Program Files (x86)\Jenkins\
                                </li><li>Click on “Manage Jenkins” and click on “Configure Global Security”.
                                </li><li>Under Agents choose port for TCP port for JNLP agents, choose "Random " if all ports are open otherwise choose "Fixed" and give the specific port number e.g "49187" for Jenkins tool.
                                </li>
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to create job in Jenkins to run HFT test</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ul>
                                    <li>Login to Jenkins tool with valid username and password.
                                    </li><li>Click on "New Item" and give any name in the "Enter an item name"
                                    </li><li>Click on "Free Style project" and click on "OK".
                                    </li><li>Under the "General" tab, select the checkbox "Restrict where this project can be run "
                                    </li><li>Under the "Label Expression" give the Agent Name .
                                    </li><li>In "Build Triggers" tab, select the checkbox "Build after other projects are built"
                                    </li><li>In “ Projects to watch”, give the Project Name .
                                    </li><li>Select the radio button "Trigger only if build is stable".
                                    </li><li>Click on "Save" to save all the changes.
                                    </li><li>Click on "Configure" link on the LHS.
                                    </li><li>Under "Build" tab, click on "Add build step" then select "Run an HCL Web UI Tester test".
                                    </li><li>Give the details like Name, Workspace , Project , Test Suite Name, IMShared Location.
                                    </li><li>Here ”Test” is the name of the testscript,”Workspace” is path where HFT testscript are stored,” Project Name” is the TestWorkBench projectname,” IM Shared Location” is the path where Installation manager is present.
                                    </li><li>Under “Exported Statistical Report” in html , give the path for the Result folder These results will be saved in Jenkins workspace.</li>
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);