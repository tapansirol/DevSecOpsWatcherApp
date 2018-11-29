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
                    
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Coming Soon...</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ul>
                                    <li>Coming Soon....This Page 8
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