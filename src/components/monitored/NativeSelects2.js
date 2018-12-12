import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


export default class NativeSelects2 extends React.Component {
  
  state = {
  };
  
  containsInCommonServices = (inputArray, service, key) =>{
    for(let input of inputArray) {
        if(input == service[key]) {
           return true;
        }
    }
    return false;
}

getCommonServicesCategory(pipelineArray){
    let commonServicesCategory =[];
    pipelineArray.map(pipelineObj =>{
        pipelineObj['services'].map(service => {
           if(!this.containsInCommonServices(commonServicesCategory, service, 'serviceCategory')) {
              commonServicesCategory.push(service.serviceCategory);
            }
        });
    });
    return commonServicesCategory;
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
          
          {this.getCommonServicesCategory(pipelineArray).map((team) => <option key={team} value={team}>{team}</option>)}
        </NativeSelect>
        
      </FormControl>


    );
  }
}

NativeSelects2.propTypes = {
  classes: PropTypes.object.isRequired,
};
