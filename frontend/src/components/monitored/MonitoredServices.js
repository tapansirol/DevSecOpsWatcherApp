import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
// import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import ServicesList from './ServicesList';
//import ImageCard from './ImageCard';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InfoCard from './InfoCard';
//import Java from '../static/images/java-logo.jpg';

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
    constructor(props) {
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
       // this.props.changeValue1(newvalue1);
      }

      onChangeValue2(newvalue2){
        this.setState({
          myvalue2: newvalue2
        });
       // this.props.changeValue1(newvalue1);
      }

    render() {
        const { classes, pipelineArray } = this.props;
        return(
            <div style={{display: 'inline-flex', margin: '20px', marginTop: '0px', width: '100%'}}>
                <div>
                    <div className={classes.search} style={{border: 'groove', background: 'white'}}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Input style= {{marginLeft: 50}}
                            placeholder="Search…"
                            disableUnderline
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                            />   
                    </div>
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
