import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects extends React.Component {
  
  state = {
   
  };
  

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.changeValue(event.target.value);
  };

  render() {
    return (
      <FormControl >
        <NativeSelect
          onChange={this.handleChange().bind(this)}
        >
          <option value="ALL">
            ALL
            </option>
          <option value="DEVELOPANDTEST">DEVELOPANDTEST</option>
          <option value="RELEASEANDDEPLOY">RELEASEANDDEPLOY</option>
          <option value="PLANANDMEASURE">PLANANDMEASURE</option>
        </NativeSelect>
        
      </FormControl>


    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

