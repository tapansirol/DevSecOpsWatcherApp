import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects1 extends React.Component {
  
  state = {
  };
  

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.changeValue1(event.target.value);
  };

  render() {
    return (
      <FormControl >
        <NativeSelect disableUnderline
          onChange={this.handleChange().bind(this)}
        >
          
          <option value="ALL">All Tool status</option>
          <option value="true">Active Tools in pipeline</option>
          <option value="false">Inactive Tools in pipeline</option>
        </NativeSelect>
        
      </FormControl>


    );
  }
}

NativeSelects1.propTypes = {
  classes: PropTypes.object.isRequired,
};

