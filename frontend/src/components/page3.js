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
        const {classes} =  this.props;
        return(
            <div  id="HomeScreen">
                    <ExpansionPanel defaultExpanded = {true}  style={{height:'500px'}}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Steps to Configure Urban Code Deploy with Jenkins</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>Login to UCD tool with valid username and password.</li>
                                <li>Click on “Settings” tab, under that navigate to “System settings”.</li>
                                <li>Under General Settings tab, under Agent for Version import, select “ucda-docker” and click on “save” button.</li>
                                <li>Now go to the Resources tab, and click on “Create Top Level Group”,</li>
                                <li>In the “Create resource” pop-up, give the Resource name, for e.g. JpetStore-resource and click in save button.</li>
                                <li>Hover over the Resource Name, i.e. JpetStore, user can see the “Actions” link.</li>
                                <li>Under the Actions link, select the “Add Agent”.</li>
                                <li>Under the “Agent” field, select “ucda-docker “and click on save button.</li>
                                <li>Click on “Applications” tab.</li>
                                <li>Click on “Create Application”, give the Application name i.e. JpetStore-App and click on “Create” button. Now the application will be successfully created.</li>
                                <li>Click on the Application name, i.e. JpetStore-App.</li>
                                <li>Now click on “Create Environment”, it will open the “Create Environment” pop-up.</li>
                                <li>Give the Environment name for e.g. “Test” and click on “save” button.</li>
                                <li>Click on the “Environment name” which you just now created, i.e. “Test”.</li>
                                <li>Under Environment name, click on “Add Base Resources”.</li>
                                <li>Select the Resource which you created earlier, i.e.”Jpetstore-resource” .</li>
                                <li>Now login to Jenkins tool and click on “Build Now” for the Pipeline “jpetstore”.</li>
                                <li>Jenkins tool will create the component “Jenkins-jpet-component” with latest version of the build.</li>
                                
                            </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
        )
    }

}

export default withStyles(styles)(page1);