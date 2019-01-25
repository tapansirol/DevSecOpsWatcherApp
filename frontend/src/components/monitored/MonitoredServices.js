import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ServicesList from './ServicesList';
import InfoCard from './InfoCard';

const styles = theme => ({
   
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    t1: {
        width:10,
       height:10,
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginTop: 20,
      },
  });

class MonitoredServices extends Component {
    constructor() {
        super();
        this.state= {
            myvalue1:"ALL",
            myvalue2:"ALL"
        }
    }


    onChangeValue1(newvalue1){
        this.setState({
          myvalue1: newvalue1
        });
      }

      onChangeValue2(newvalue2){
        this.setState({
          myvalue2: newvalue2
        });
      }

    render() {
        const { pipelineArray } = this.props;
        return(
            <div style={{display: 'inline-flex', margin: '20px', marginTop: '0px', width: '100%'}}>
                <div>
                    
                    <InfoCard pipelineArray = {pipelineArray} changeValue1={this.onChangeValue1.bind(this)} changeValue2={this.onChangeValue2.bind(this)}></InfoCard>
                </div>
            
                <div>                        
                    <ServicesList pipelineArray = {pipelineArray} myvalue1={this.state.myvalue1} myvalue2={this.state.myvalue2} /> 
                </div>
                    
            </div>
        );
    }
}

export default withStyles(styles) (withRouter(MonitoredServices));
