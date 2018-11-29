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
        const { classes } = this.props;
        return(
            <div  id="HomeScreen">
                    <ExpansionPanel defaultExpanded = {true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Scripts to Start the Docker Container</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.exp}>
                            <Typography>
                            <ul>
                                <li>	Launch the tools, (Jenkins, Sonar cube, UCV, UCD)</li>
                                <li>Untar the below given file by using command:<br/>tar -zxvf DevsecOps.tar.xz</li>
                                <li>Give permission to the target extraction folder using command <br/>“sudo chmod 777 DevsecOps”</li>
                                <li>Go inside unzipped folder using command<br/>cd DevSecOps,</li>
                                <li>To start all container execute start-container.sh script by using below command<br/>./start-all-container.sh</li>
                                <li>To open Jenkins, Urban Code Deploy, Urban Code Velocity open the below URL in browser
                                    <ul>
                                        <li>Jenkins --> http://IP-address:9292</li>
                                        <li>Urbancode deploy --> https://IP-address:8443</li>
                                        <li>Urbancode velocity --> https://IP-address</li>
                                        <li>SonarQube --> http;//IP-address:9000</li>
                                    </ul>
                                    Note: IP address could be taken from ifconfig command
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