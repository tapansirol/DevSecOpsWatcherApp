import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MonitoredServices from './MonitoredServices';
import Pipelines from './Pipelines';
import APIService from "../../util/APIService";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
    root: {
      flexGrow: 1,
    },
  };


// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };


class SimpleTab extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: 1,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, pipelineArray } = this.props;
    const { value } = this.state;

    //console.log("papapapapa :",pipelineArray)

    return (
    <div>
        {/* <Paper className={classes.root}> */}
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
        <Tab label="MONITORED SERVICES"/>
        <Tab label="PIPELINE ASSEMBLY" />
        </Tabs>
      {/* </Paper> */}

        {value == 0 && (
          <TabContainer>
            <MonitoredServices pipelineArray ={pipelineArray}/>
          </TabContainer>
        )}
        {value === 1 && <TabContainer><Pipelines pipelineArray ={pipelineArray}/></TabContainer>}
      </div>
    );
  }
}

SimpleTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTab);
