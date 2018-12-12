import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects3 extends React.Component {
  
  state = {
  };
  
  

getPipelines(pipelineArray){
    let pl =[];
    pipelineArray.map(pipelineObj =>{         
              pl.push(pipelineObj.pipeleineName);
    });
    return pl;
}
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
         
          const {pipelineArray} =this.props;
    return (
      <FormControl >
        <NativeSelect
          onChange={this.handleChange().bind(this)}
        >
          {this.getPipelines(pipelineArray).map((team) => <option key={team} value={team}>{team}</option>)}
        </NativeSelect>
        
      </FormControl>


    );
  }
}

NativeSelects3.propTypes = {
  classes: PropTypes.object.isRequired,
};
