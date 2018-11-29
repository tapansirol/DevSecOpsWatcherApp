import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects extends React.Component {
  
  state = {
    // age: '',
    // name: 'hai',
    //var1:''
   // ddvalue:"ALL"
  };
  

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  //  this.setState({ddvalue:event.target.value});
   // this.setState({var1:event.target.value});
    this.props.changeValue(event.target.value);
  };

  render() {
          // const {var1} = this.state;
    return (
      <FormControl >
        <NativeSelect

          //  value={this.state.age}
          //   name="status"
          onChange={this.handleChange().bind(this)}
      //    var1={var1}
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

//export default withStyles(styles)(NativeSelects);
