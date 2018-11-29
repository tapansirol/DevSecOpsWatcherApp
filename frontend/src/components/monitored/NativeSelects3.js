import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects3 extends React.Component {
  
  state = {
    // age: '',
    // name: 'hai',
    //var1:''
   // ddvalue:"ALL"
   //arr:[]
  };
  
  

getPipelines(pipelineArray){
    let pl =[];
    pipelineArray.map(pipelineObj =>{
     //   pipelineObj['services'].map(service => {
           
              pl.push(pipelineObj.pipeleineName);
           
     //   });
    });
    return pl;
}
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  //  this.setState({ddvalue:event.target.value});
   // this.setState({var1:event.target.value});
 //   this.props.changeValue1(event.target.value);
  };

  render() {
          // const {var1} = this.state;
          const {pipelineArray} =this.props;
    return (
      <FormControl >
        <NativeSelect

          //  value={this.state.age}
          //   name="status"
          onChange={this.handleChange().bind(this)}
      //    var1={var1}
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

//export default withStyles(styles)(NativeSelects);
