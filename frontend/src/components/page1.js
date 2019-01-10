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
                <Typography style={{fontWeight:'bold', marginLeft:24,marginTop:24,marginBottom:24}}>1- Download the JTS-CCM-QM-RM-JRS-RELM-repo-6.0.6.zip package.</Typography>
                    <ExpansionPanel defaultExpanded = {true} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Details:</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>Go to the below link.
                                        Link:  https://jazz.net/downloads/rational-team-concert/releases/6.0.6/JTS-CCM-QM-RM-JRS-RELM-repo-6.0.6.zip
                                </li><li>Now login with your jazz account.If  jazz account account is not there,User  need to create it.
                                </li><li>Under the "License Agreement", check the checkbox for "I agree to the terms of the license" and then click on "Download" button.
                                </li><li>It will download the package 	JTS-CCM-QM-RM-JRS-RELM-repo-6.0.6.zip (3087.97 MB).
                                        Link: https://jazz.net/downloads/rational-team-concert/releases/6.0.6/JTS-CCM-QM-RM-JRS-RELM-repo-6.0.6.zip
                                </li>
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <ExpansionPanel defaultExpanded = {true} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Download and install IBM Installation Manager:</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                            <li>Click on the below link 
                                </li><li>https://jazz.net/downloads/ibm-installation-manager/releases/1.8.9.1
                                </li><li>	Under "IBM Installation Manager", click on WindowsX86-64(166.24 MB) file.
                                </li><li>	Under the "license Agreement", check the checkbox for "I agree to the terms of the license" and click on "Download" button.
                                </li><li>	It will download the software "agent.installer.win32.win32.x86_64_1.8.9001.20180709_1302".
                                </li><li>	Now right click on zipped file and select "Extract All".
                                </li><li>	Select the destination folder for Extraction and click on "Extract". It will extract the folder 
                                </li><li>	agent.installer.win32.win32.x86_64_1.8.9001.20180709_1302.
                                </li><li>Now in the extracted folder, click on executable application file for install.
                                </li><li>It will open up the "Install Packages" window for "IBM Installation Manager(version1.8.9.1)".
                                </li><li>	Click on "Next" button.
                                </li><li>	Select the radio button for "I accept the terms in the license agreement" and click on "Next" button.
                                </li><li>	It will display the path for "Installation Manager Directory" i.e C:\Program Files\IBM\Installation Manager\eclipse
                                </li><li>	Click on "Next " button.
                                </li><li>	Under the packages "IBM Installation Manager 1.8.9.1" will be added, click on "install" button.
                                </li><li>	User will get the confirmation message "the packages are installed".Click on "Restart Installation Manager" button.
                                </li><li>	Now add the repository.config file  to the installation manager.
                                </li><li>	(File-->Preferences-->Add Repository Click-->Browse the location ofJTS-CCM-QM-RM-JRS-RELM-repo-6.0.6---> repository.config)
                                </li><li>	Under the Install Packages, select the following softwares.
                                </li><li>Change and Configuration Management(Version 6.06)
                                </li><li>Jazz Team Server(Version 6.06)
                                </li><li>Quality Management(Version 6.06)
                                </li><li>Requirement Management (version 6.06)
                                </li><li>Trial keys for Collaborative Lifecycle Management Products(Version 6.06)
                                </li><li>
                                </li><li>	Click on "Next " button and then again  click on "Next" button.
                                </li><li>
                                </li><li>
                                </li><li>	Check the radio button for "I accept the terms in the license agreements". and click on "Next" button.
                                </li><li>	It will display the path for Shared Resources ,Directory :C:\Program Files\IBM\IBMIMShared and click on "Next" button.
                                </li><li>	Under the Install Packages, "Create a new package group" radio button should be selected and below data should be displayed.
                                </li><li>	Package Group Name : IBM Collaborative Lifecycle Management
                                </li><li>	Installation Directory: C:\Program Files\IBM\JazzTeamServer
                                </li><li>	Architecture Selection :64- bit
                                </li><li>	and click on "Next"   button 
                                </li><li>	under Select the translations to install "English" should be checked. and then click on "Next" button.
                                </li><li>	Go with the default selection and click on Next button (4 times).
                                </li><li>           Under the packages below software will be added
                                </li><li>Change and Configuration Management(Version 6.06)
                                </li><li>Jazz Team Server(Version 6.06)
                                </li><li>Quality Management(Version 6.06)
                                </li><li>Requirement Management (version 6.06)
                                </li><li>Trial keys for Collaborative Lifecycle Management Products(Version 6.06)
                                </li><li>	Now click on "Install" button.It will take sometime to do the Installation .Now Click on "Finish" button.
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