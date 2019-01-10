import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import MonitoredServices from './MonitoredServices';
import Pipelines from './Pipelines';

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


class SimpleTab extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, pipelineArray } = this.props;
    const { value } = this.state;

    return (
    <div>
  
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
        <Tab style={{textTransform: "none",fontSize: 16}} label="Monitored Tools"/>
        <Tab style={{textTransform: "none",fontSize: 16}} label="Pipeline" />
        </Tabs>

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
