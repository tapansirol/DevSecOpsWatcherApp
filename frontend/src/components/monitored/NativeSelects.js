import React from 'react';
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
          style={{marginLeft: 10}}>
          <option value="ALL" >
            All Sections
            </option>
          <option value="DEVELOPANDTEST">Develop and Test</option>
          <option value="RELEASEANDDEPLOY">Release and Deploy</option>
          <option value="PLANANDMEASURE">Plan and Measure&emsp;&emsp;</option>
        </NativeSelect>
        
      </FormControl>


    );
  }
}


