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
        <NativeSelect disableUnderline
          onChange={this.handleChange().bind(this)}
        >
          <option value="ALL">
            All Tool Status
            </option>
          <option value="DEVELOPANDTEST">DEVELOP AND TEST</option>
          <option value="RELEASEANDDEPLOY">RELEASE AND DEPLOY</option>
          <option value="PLANANDMEASURE">PLAN AND MEASURE</option>
        </NativeSelect>
        
      </FormControl>


    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

