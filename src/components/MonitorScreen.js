import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SimpleTab from './monitored/SimpleTab';
import APIService from '../util/APIService';

  
const styles = {
    
  };

class MonitorScreen extends Component {
    constructor(props) {
        super();
        this.state= {
            pipelineArray: [],
        };
        
        this.setStateFn = this.setStateFn.bind(this);// to bind setStateFn as this is being passed to APIService
    }

    setStateFn = (key, result) => {//callback fn to be passed to APIService
        let obj = {}
        obj[key] = result
        this.setState(obj)
     }

     
    componentWillMount(){//lifecycle method of component
        let pipelineArray = this.props.pipelineArray;
        if(!pipelineArray){
            APIService.get('api/createdPipelines', null, (result) => { this.setStateFn('pipelineArray', result)});
        } else {
            this.setState({
                pipelineArray: pipelineArray,
            })
        }
        console.log('Monitor screen this.state.pipelineArray ', pipelineArray); 
    }
    
    
   

    render() {

        const { pipelineArray } = this.state;

        return(
            <div>
                <SimpleTab pipelineArray={pipelineArray}/>
            </div>
        );
            
    }
}

export default withStyles(styles) (withRouter(MonitorScreen));